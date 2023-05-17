import { Configuration, OpenAIApi } from 'openai';
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

  async chat(content) {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: this.roles.USER, content },
          {
            role: this.roles.SYSTEM,
            content: 'Ты пишешь пост для аудитори в Вконтакте',
          },
        ],
      });

      return response.data.choices[0].message;
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
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

export const openai = new OpenAi(process.env.OPENAI_KEY);
