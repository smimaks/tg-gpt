import { VK } from 'vk-io';
import { envs } from './libs/envs.js';

const vk = new VK({
  token: envs.VK_API_KEY,
});
export async function vkPost(text) {
  return await vk.api.wall.post({
    owner_id: envs.OWNER_ID,
    from_group: 1,
    message: text,
  });
}
