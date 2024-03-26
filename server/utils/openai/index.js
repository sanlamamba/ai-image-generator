import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openaiConfig);

export default openai;
