"use server";

export async function login(prev: any, formData: FormData) {
  const data = {
    password: formData.get("password"),
  };

  if (data.password !== "12345") {
    return {
      errors: ["Wrong Password!"],
    };
  } else {
    return {
      message: "Welcome back!",
    };
  }
}
