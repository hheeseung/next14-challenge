import { useFormStatus } from "react-dom";

export default function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        disabled={pending}
        className="bg-neutral-200 p-2 rounded-full font-medium hover:bg-neutral-300 hover:transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
      >
        {pending ? "Loading..." : text}
      </button>
    </>
  );
}
