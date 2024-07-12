"use server";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "@/utils/createSession";

const PASSWORD_REGEX = new RegExp(/^(?=.*\d).+$/);

const formSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(5, "사용자 이름은 5글자 이상이어야 합니다."),
    password: z
      .string()
      .min(5, "비밀번호는 5글자 이상이어야 합니다.")
      .regex(
        PASSWORD_REGEX,
        "비밀번호에는 0-9까지의 숫자가 꼭 들어가야 합니다."
      ),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "사용자 이름이 이미 존재합니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이메일이 이미 존재합니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function signup(prev: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    await createSession(user);
    redirect("/");
  }
}
