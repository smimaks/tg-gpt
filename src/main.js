import { Telegraf, session } from 'telegraf';
import { message } from 'telegraf/filters';
import {code} from 'telegraf/format'
import { config } from 'dotenv';
import { converter } from './oggConverter.js';
import { openai } from './openai.js';

config()

const INITIAL_SESSION = {
  messages: []
}

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.use(session())
bot.command('new', async ctx => {
  ctx.session = INITIAL_SESSION
  await ctx.reply("Жду голосове или текстовое сообщение")
})


bot.command('start', async ctx => {
  ctx.session = INITIAL_SESSION
  await ctx.reply("Жду голосове или текстовое сообщение")
})

bot.on(message('voice'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  try {

    await ctx.reply(code('Ожидай, сейчас все будет!'))

    const voiceLink = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
    const userId = String(ctx.message.from.id);

    const oggPath = await converter.create(voiceLink.href, userId);
    const mp3Path = await converter.toMP3(oggPath, userId);

    const text = await openai.transcription(mp3Path)
    await ctx.reply(code(`Твой запрос: ${text}`))

    ctx.session.messages.push({role: openai.roles.USER, content: text})
    const response = await openai.chat(ctx.session.messages)

    ctx
    .session
    .messages
    .push({role: openai.roles.ASSISTANT, content: response.content})

    await ctx.reply(response.content);
  } catch (e) {
    console.log('Error voice', e.message);
  }
});

bot.on(message('text'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  try {

    await ctx.reply(code('Сообщение приянто. Ожидаю ответ от сервера'))
    
    ctx
    .session
    .messages
    .push({role: openai.roles.USER, content: ctx.message.text})

    const response = await openai.chat(ctx.session.messages)

    ctx
    .session
    .messages
    .push({role: openai.roles.ASSISTANT, content: response.content})

    await ctx.reply(response.content);
  } catch (e) {
    console.log('Error voice', e.message);
  }
});


bot.launch();
