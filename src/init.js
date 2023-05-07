import { getRequest } from './libs/requests.js';
import { openai } from './openai.js';
import { vkPost } from './vk.js';
import * as http from 'http';

export async function init() {
  const { text, imagePrompt } = getRequest();
  const response = await openai.chat(text);
  console.info('Ответ GPT_3 получен');
  if (response?.content) await vkPost(response.content);
}
