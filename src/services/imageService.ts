const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateImage = async (textCommand: string) => {
  const response = await openai.createImage({
    prompt: textCommand,
    n: 3,
    size: "512x512",
  });
  return response
}
