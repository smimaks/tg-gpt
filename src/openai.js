import { Configuration, OpenAIApi } from 'openai';
import { envs } from './libs/envs.js';
import axios from 'axios';
import * as fs from 'fs';

class OpenAi {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  };
  tokens = 0;
  max_tokens = 4000;

  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async chat(content) {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: this.roles.USER, content }],
      });

      this.tokens += response.data.usage.total_tokens;

      if (this.tokens >= this.max_tokens) {
        await this.openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [{ role: this.roles.USER, content: 'сброс контекста' }],
        });
        return {
          role: this.roles.SYSTEM,
          content:
            'Допустимый размер контекста превышен. Нажите команду /new и продолжите общение',
        };
      }

      return response.data.choices[0].message;
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);

        const content =
          e.response.status === 400
            ? 'Превышен лимит контекста для этой модели'
            : 'Превышено количесвто завпросов в минуту. Подождите несколько минут и продолжайте';

        return {
          role: this.roles.SYSTEM,
          content,
        };
      }
      console.log('GPT chat request error', e.message);
    }
  }

  async getImage(prompt) {
    try {
      const resp = await this.openai.createImage({
        prompt,
        size: '512x512',
      });
      // console.log(resp.data.data[0].url);
      return resp.data.data[0].url;
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);

        const content =
          e.response.status === 400
            ? 'Превышен лимит контекста для этой модели'
            : 'Превышено количесвто завпросов в минуту. Подождите несколько минут и продолжайте';

        return {
          role: this.roles.SYSTEM,
          content,
        };
      }
      console.log('GPT chat request error', e.message);
    }
  }
}

export const openai = new OpenAi(envs.OPENAI_KEY);
