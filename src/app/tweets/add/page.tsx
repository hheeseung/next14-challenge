"use client";
import { useFormState, useFormStatus } from "react-dom";
import { addTweet } from "./actions";

export default function AddTweet() {
  const [state, dispatch] = useFormState(addTweet, null);
  const { pending } = useFormStatus();

  return (
    <section className="p-6 w-full">
      <h1 className="font-bold text-2xl mb-4">📝 Post Tweet</h1>
      <form
        action={dispatch}
        className="flex flex-col justify-center items-center space-y-4"
      >
        <textarea
          rows={5}
          name="tweet"
          className="w-full resize-none p-4 rounded-xl shadow-md outline-none"
          placeholder="Write your tweet here!"
          autoFocus
        />
        <span className="text-red-500 font-medium">
          {state?.fieldErrors.tweet}
        </span>
        <button
          disabled={pending}
          className="w-full bg-lime-600 text-white rounded-xl font-medium px-2 py-3 hover:brightness-110 hover:transition-all disabled:cursor-not-allowed"
        >
          {pending ? "Uploading..." : "Submit"}
        </button>
      </form>
    </section>
  );
}
