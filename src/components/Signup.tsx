"use client";
import { useFormState } from "react-dom";
import Input from "./Input";
import { signup } from "@/app/(auth)/create-account/action";
import Button from "./Button";

export default function Signup() {
  const [state, dispatch] = useFormState(signup, null);

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
          name="username"
          type="text"
          placeholder="🙍‍♂️ Username"
          errors={state?.fieldErrors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="🔑 Password"
          errors={state?.fieldErrors.password}
        />
        <Button text="회원가입" />
      </form>
    </section>
  );
}
