import { Configuration, OpenAIApi } from 'openai';
import { createReadStream } from 'fs';
import { removeFile } from './utils.js';
import { config } from 'dotenv';

config();

class OpenAi {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  };

  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async chat(messages) {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      });
      return response.data.choices[0].message;
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);

        const content =
          e.response.status === 400
            ? 'Превышен лимит контекста для этой модели'
            : 'Превышено количесвто завпросов в минуту';

        return {
          role: this.roles.SYSTEM,
          content,
        };
      }
      console.log('GPT chat request error', e.message);
    }
  }

  async transcription(filepath) {
    try {
      const response = await this.openai.createTranscription(
        createReadStream(filepath),
        'whisper-1',
      );
      await removeFile(filepath);
      return response.data.text;
    } catch (e) {
      console.log('transcription error', e.message);
    }
  }
}

export const openai = new OpenAi(process.env.OPENAI_KEY);
