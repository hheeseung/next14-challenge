"use client";
import { login } from "@/app/(auth)/log-in/action";
import { useFormState } from "react-dom";
import Input from "./Input";
import Button from "./Button";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <section className="p-5">
      <h1 className="text-center text-4xl my-8">🥑</h1>
      <form
        action={dispatch}
        className="flex flex-col justify-center space-y-4 w-96 mx-auto"
      >
        <Input
          name="email"
          type="email"
          placeholder="📧 Email"
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="🔑 Password"
          errors={state?.fieldErrors.password}
        />
        <Button text="로그인" />
      </form>
    </section>
  );
}
