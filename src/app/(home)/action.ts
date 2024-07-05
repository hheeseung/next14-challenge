"use server";
import { z } from "zod";

const checkEmail = (email: string) => !!email.includes("@zod.com");

const PASSWORD_REGEX = new RegExp(/^(?=.*\d).+$/);

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmail, "Only @zod.com emails are allowed."),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .regex(
      PASSWORD_REGEX,
      "Password should be contain at least one number (0-9)."
    ),
});

export async function login(prev: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  } else {
    return { success: true };
  }
}
