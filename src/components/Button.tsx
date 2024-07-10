import { useFormStatus } from "react-dom";

export default function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        disabled={pending}
        className="bg-lime-600 text-white p-2 rounded-full font-medium hover:brightness-110 hover:transition-all disabled:cursor-not-allowed"
      >
        {pending ? "Loading..." : text}
      </button>
    </>
  );
}
