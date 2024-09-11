export interface FormState extends PromptResponse {
  success: boolean;
}

export interface FormValues {
  manualText: string;
  fileText: File;
}

export interface PromptResponse {
  isSpam: boolean;
  message: string;
}
