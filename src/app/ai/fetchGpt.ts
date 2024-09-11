"use server";

import type { FormState, PromptResponse } from "../models";

const {
  AI_STUDIO_KEY,
  AI_STUDIO_ENDPOINT_GTP_4O,
  AI_STUDIO_ENDPOINT_EMBEDDING,
} = process.env;

export async function fetchGtp(prompt: string): Promise<FormState> {
  if (!AI_STUDIO_KEY) throw Error("Invalid AI Studio Key");
  if (!AI_STUDIO_ENDPOINT_GTP_4O)
    throw Error("Invalid AI Studio GTP-4o Endpoint");
  if (!AI_STUDIO_ENDPOINT_EMBEDDING)
    throw Error("Invalid AI Studio Embeddings Endpoint");

  const systemPrompt =
    "You will be provided with a text, and your task is determine if is spam. \
    Use the same language as in the sentence and use informal language \
    Write your output in json with a boolean key called isSpam and a descriptive text called message";
  const payload = {
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 800,
    response_format: { type: "json_object" },
  };

  try {
    const headers = {
      "Content-Type": "application/json",
      "api-key": AI_STUDIO_KEY,
    };
    const response = await fetch(AI_STUDIO_ENDPOINT_GTP_4O, {
      headers,
      method: "POST",
      body: JSON.stringify(payload),
    });

    const json = await response.json();
    const jsonContent = json["choices"][0]["message"]["content"];
    const { isSpam, message } = JSON.parse(jsonContent) as PromptResponse;

    return { success: true, message, isSpam };
  } catch (error) {
    console.error("Error fetching GTP: ", error);
    return {
      success: false,
      isSpam: false,
      message: "Ocurrió un error",
    };
  }
}
