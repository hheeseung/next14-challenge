"use client";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { login } from "./action";
import Button from "@/components/Button";

export default function Home() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <section className="p-5">
      <h1 className="text-center text-4xl my-5">🔥</h1>
      <form
        action={dispatch}
        className="flex flex-col justify-center space-y-4 w-96 mx-auto"
      >
        <Input
          name="email"
          type="email"
          placeholder="📧 Email"
          errors={state?.errors?.fieldErrors.email}
        />
        <Input
          name="username"
          type="text"
          placeholder="🙍‍♂️ Username"
          errors={state?.errors?.fieldErrors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="🔑 Password"
          errors={state?.errors?.fieldErrors.password}
        />
        <Button text="Log In" />
      </form>
      {state?.success && (
        <div className="bg-green-500 w-96 mx-auto mt-4 p-3 rounded-xl text-center">
          ☑ Welcome!
        </div>
      )}
    </section>
  );
}
