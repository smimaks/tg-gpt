import { Configuration, OpenAIApi } from "openai";
import {createReadStream} from 'fs' 
import config from "config";
import { removeFile } from "./utils.js";


class OpenAi {
roles = {
  ASSISTANT: 'assistant',
  USER: 'user',
  SYSTEM: 'system'
}

  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async chat(messages) {
    try {
    const response =  await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0
      })
      return response.data.choices[0].message
    } catch(e) {
      console.log('GPT chat request error', e)
    }
  }

  async transcription(filepath) {
    try {
   const response =  await this.openai.createTranscription(
      createReadStream(filepath), 'whisper-1'
     )
      await removeFile(filepath)
      return response.data.text
    } catch(e) {
      console.log('transcription error', e)
    }
  }
}

export const openai = new OpenAi(config.get("OPENAI_KEY"));
