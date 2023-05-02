import { rejects } from 'assert';
import axios from 'axios';
import { createWriteStream } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import ffmmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg';
import { removeFile } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

class OggConverter {
  constructor() {
    ffmmpeg.setFfmpegPath(installer.path);
  }

  async toMP3(input, output) {
    try {
      const outPutPath = resolve(dirname(input), `${output}.mp3`);

      return new Promise((resolve, reject) => {
        ffmmpeg(input)
          .inputOption('-t 30')
          .output(outPutPath)
          .on('end', () => {
            resolve(outPutPath);
            removeFile(input);
          })
          .on('error', (err) => reject(err.message))
          .run();
      });
    } catch (e) {
      console.log('MP3 create error', e);
    }
  }

  async create(url, filename) {
    try {
      const oggPath = resolve(__dirname, '../voices', `${filename}.ogg`);
      const response = await axios({
        method: 'get',
        url,
        responseType: 'stream',
      });
      return new Promise((resolve) => {
        const stream = createWriteStream(oggPath);

        response.data.pipe(stream);
        stream.on('finish', () => resolve(oggPath));
      });
    } catch (e) {
      console.log('Axios error', e);
    }
  }
}
export const converter = new OggConverter();
