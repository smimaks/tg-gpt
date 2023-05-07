import { VK } from 'vk-io';
import { config } from 'dotenv';
config();

const vk = new VK({
  token: process.env.VK_API_KEY,
});
export async function vkPost(text) {
  return await vk.api.wall.post({
    owner_id: process.env.OWNER_ID,
    from_group: 1,
    message: text,
  });
}
