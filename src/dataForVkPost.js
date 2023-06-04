import { getRequest } from './libs/requests.js';
import { openai } from './openai.js';
import { vkPost } from './vk.js';
import * as http from 'http';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

async function dataForVkPost() {
  if (new Date().getHours() <= 6) return;
  try {
    const { text, imagePrompt } = getRequest();
    const response = await openai.chat(text);
    const imageUrl = await openai.getImage(imagePrompt);
    const img = await downloadImage(imageUrl);
    console.info(new Date().toISOString(), 'Ответ GPT_3 получен');
    if (response?.content) {
      await vkPost(response.content, img);
      console.info(new Date().toISOString(), 'Пост опубликован в группе');
      deleteImg(img);
    }
  } catch (e) {
    console.log('Init method Error', e.message);
  }
}

async function downloadImage(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  if (response?.data) {
    const pathToExc = process.argv[1].split('/');
    const pathToImgDir = path.normalize(buildPath(pathToExc));
    const pathToImg = `${pathToImgDir}/images/temp.png`;
    fs.writeFileSync(pathToImg, Buffer.from(response.data));
    return pathToImg;
  }
}

function buildPath(arr) {
  let path = '';
  for (const i of arr) {
    if (i === arr.at(0) || i === arr.at(-1) || i === arr.at(-2)) continue;
    path += `/${i}`;
  }
  return path;
}

export function main() {
  const minute = 62300;
  const hour = minute * 61;
  const interval = 3 * hour;
  setInterval(dataForVkPost, interval);
  console.log(new Date().toISOString(), 'Приложение запущено');
}

export function deleteImg(img) {
  if (img) fs.unlinkSync(img);
}
