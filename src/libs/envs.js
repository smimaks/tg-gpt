import { config } from 'dotenv';
config();

export const envs = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  OPENAI_KEY: process.env.OPENAI_KEY,
  VK_API_KEY: process.env.VK_API_KEY,
  OWNER_ID: process.env.OWNER_ID,
};

const unsetEnvs = [];
for (const [key, val] of Object.entries(envs)) {
  if (!val) unsetEnvs.push(key);
}

if (unsetEnvs.length) console.log(`UNSET ENVS: ${unsetEnvs.map((i) => i)}`);
