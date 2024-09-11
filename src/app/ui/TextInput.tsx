import { InputHTMLAttributes } from "react";

export default function TextInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:cursor-pointer file:text-white file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );
}
