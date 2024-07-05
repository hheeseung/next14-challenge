import { InputHTMLAttributes } from "react";

interface Props {
  errors?: string[];
  name: string;
}

export default function Input({
  errors = [],
  name,
  ...rest
}: Props & InputHTMLAttributes<HTMLInputElement>) {
  const hasError = errors.length > 0;

  return (
    <div>
      <input
        name={name}
        className={`border-2 ${
          hasError ? "border-red-500 focus:ring-red-500" : "border-neutral-200"
        } ring-offset-2 w-full rounded-full transition px-4 py-2 ring-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400`}
        {...rest}
      />
      {errors.map((error, index) => (
        <span
          key={index}
          className="text-red-500 font-medium px-2 py-1 flex flex-col text-sm"
        >
          {error}
        </span>
      ))}
    </div>
  );
}
