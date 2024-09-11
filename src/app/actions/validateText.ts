"use server";

import { fetchGtp } from "../ai";
import type { FormState, FormValues } from "../models";

export async function validateText(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";

  const { fileText, manualText } = Object.fromEntries(
    formData
  ) as unknown as FormValues;

  if (!fileText.size && !manualText)
    return {
      isSpam: false,
      success: false,
      message: "Ingrese texto o seleccione un archivo para continuar",
    };

  const finalText = fileText.size ? await fileText.text() : manualText;
  return await fetchGtp(finalText);
}
