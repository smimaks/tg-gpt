// import { Telegraf, session } from 'telegraf';
// import { message } from 'telegraf/filters';
// import { code } from 'telegraf/format';
// import { openai } from './openai.js';
// import { vkPost } from './vk.js';
// import { getRequest } from './libs/requests.js';
//
// // const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
// const bot = new Telegraf('6025168052:AAG-mZjSraTZH6-gFbJcp7wkq8PFrs0U3FM');
//
// bot.on(message('text'), async (ctx) => {
//   try {
//     await ctx.reply(code('Ожидаю ответ от сервера...'));
//     const response = await openai.getImage(ctx.message.text);
//     // if (response?.content) {
//     //   // await vkPost(response.content);
//     //
//     //   await ctx.reply(response.content);
//     // }
//   } catch (e) {
//     console.log('Error text', e.message);
//   }
// });
//
// bot.launch();
