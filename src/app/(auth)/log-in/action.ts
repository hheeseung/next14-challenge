"use server";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "@/utils/createSession";

const checkEmailExist = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const PASSWORD_REGEX = new RegExp(/^(?=.*\d).+$/);

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExist, "존재하지 않는 이메일 주소입니다."),
  password: z
    .string()
    .min(5, "비밀번호는 5자 이상이어야 합니다.")
    .regex(PASSWORD_REGEX, "비밀번호에는 0-9까지의 숫자가 꼭 들어가야 합니다."),
});

export async function login(prev: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    if (ok) {
      await createSession(user!);
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호입니다."],
          email: [],
        },
      };
    }
  }
}
