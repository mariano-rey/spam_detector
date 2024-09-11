import { useFormStatus } from "react-dom";
import Box from "./Box";
import { FormState } from "../models";

export default function VerificationResponse(props: FormState) {
  const { isSpam, success, message } = props;
  const { pending } = useFormStatus();

  if (pending || !message) return null;

  const isError = isSpam || !success;
  const borderColor = isError ? "border-rose-500" : "border-green-500";
  const emoji = isError ? "❌" : "✔";

  return (
    <Box classNames={borderColor}>
      <p role="status">
        {emoji} {message} {emoji}
      </p>
    </Box>
  );
}
