import cron from 'node-cron';
import { init } from './init.js';

export const task = cron.schedule('* 30 * * * *', () => {
  console.log('Таска запущена');
  init();
});
