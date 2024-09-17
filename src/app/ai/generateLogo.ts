"use server";

const { HUGGINGFACE_API_KEY, HUGGINGFACE_ENDPOINT } = process.env;

type ResponseSuccess = { success: true; imageBase64: string };
type ResponseFailed = { success: false; imageBase64?: never };

type Response = ResponseSuccess | ResponseFailed;

export async function generateLogo(): Promise<Response> {
  if (!HUGGINGFACE_API_KEY) throw Error("Invalid HuggingFace API Key");
  if (!HUGGINGFACE_ENDPOINT) throw Error("Invalid HuggingFace Endpoint");

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
    };
    const input = { inputs: "email in fire logo" };

    const response = await fetch(HUGGINGFACE_ENDPOINT, {
      headers,
      method: "POST",
      body: JSON.stringify(input),
    });

    const imageBase64 = Buffer.from(await response.arrayBuffer()).toString(
      "base64"
    );
    return {
      success: true,
      imageBase64: `data:image/jpeg;base64,${imageBase64}`,
    };
  } catch (error) {
    console.error("Error fetching GTP: ", error);
    return { success: false };
  }
}
