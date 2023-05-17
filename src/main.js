import { init } from './init.js';

const minute = 60000;
const hour = minute * 60;
const interval = 4 * hour;
setInterval(init, interval);
console.log(new Date().toISOString(), 'Приложение запущено');
