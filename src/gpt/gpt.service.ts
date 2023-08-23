import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class GptService {
  async fromGPT(message: string) {
    const configuration = new Configuration({
      apiKey: process.env.GPTAPIKEY,
    });

    const openai = new OpenAIApi(configuration);
    const chat_completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    return chat_completion.data.choices[0].message;
  }
}
