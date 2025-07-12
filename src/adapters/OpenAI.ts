import { AIAdapter, GenerateParams } from './type';
import OpenAI from 'openai';

export class OpenAIAdapter implements AIAdapter {
  private readonly OpenAIClient: OpenAI;
  constructor() {
    this.OpenAIClient = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });
  }

  async generate(
    params: GenerateParams
  ): Promise<string | null> {
    const response =
      await this.OpenAIClient.chat.completions.create({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        temperature: params.temperature,
        messages:
          params.messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      });
    return response?.choices[0]?.message?.content ?? null;
  }
}
