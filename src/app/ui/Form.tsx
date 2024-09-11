"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Confetti from "react-confetti";

import type { FormState } from "@/app/models";
import { validateText } from "@/app/actions";
import Loader from "./Loader";
import Box from "./Box";
import VerificationResponse from "./VerificationResponse";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useWindowSize } from "../hooks/useWindowSize";

const initialState: FormState = {
  success: false,
  isSpam: false,
  message: "",
};

function ActionButtons() {
  const { pending } = useFormStatus();

  if (pending)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  const baseClassName =
    "rounded-md p-2 px-8 hover:opacity-70 hover:color-black";
  return (
    <div className="flex justify-center gap-4">
      <button type="reset" className={`border ${baseClassName}`}>
        Reset
      </button>
      <button
        className={`bg-blue-700 ${baseClassName}`}
        type="submit"
        disabled={pending}
      >
        Verificar!
      </button>
    </div>
  );
}

export default function Form() {
  const [state, formAction] = useFormState(validateText, initialState);
  const [showConfetti, setShowConfetti] = useState(false);
  const { height, width } = useWindowSize();

  useEffect(() => {
    console.log({ state });
    if (!state.isSpam && state.success) setShowConfetti(true);
  }, [state]);

  return (
    <>
      <Confetti
        height={height - 1}
        width={width}
        style={{ pointerEvents: "none" }}
        numberOfPieces={showConfetti ? 500 : 0}
        recycle={false}
        onConfettiComplete={(confetti) => {
          setShowConfetti(false);
          confetti?.reset();
        }}
      />
      <form action={formAction} className="w-full">
        <Box>
          <TextArea name="manualText" placeholder="Ingrese su texto" />
          <div>
            <p>O seleccione un archivo de texto</p>
            <TextInput name="fileText" type="file" accept=".txt" />
          </div>
          <ActionButtons />
        </Box>
        <div className="my-2" />
        <VerificationResponse {...state} />
      </form>
    </>
  );
}
