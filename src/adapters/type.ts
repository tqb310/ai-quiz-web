export type GenerateParams = {
  temperature: number;
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  list_input?: boolean;
};

export interface AIAdapter {
  generate: (
    params: GenerateParams
  ) => Promise<string | null>;
}
