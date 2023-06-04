import { VK } from 'vk-io';
import { config } from 'dotenv';

config();

const vk = new VK({
  token: process.env.VK_API_KEY,
});
export async function vkPost(text, img) {
  const params = {
    owner_id: process.env.OWNER_ID,
    from_group: 1,
    message: text,
  };
  if (img) {
    params.attachments = await vk.upload.wallPhoto({
      source: {
        value: img,
      },
    });
  }

  return await vk.api.wall.post(params);
}
