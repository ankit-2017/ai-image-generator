const { Configuration, OpenAIApi } = require("openai");
// import mock from 'mocks/imagesResponse'
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const generateImage = async (req: any, res: any) => {
  // return res.status(200).json({
  //   data: mock
  // })
  try {
    const { value } = req.body
    const response = await openai.createImage({
      prompt: value,
      n: 3,
      size: "512x512",
    });
    return res.status(200).json({data: response.data}) 
  } catch (error: any) {
    if (error.response) {
      const { error: message } = error.response?.data || { error: '' }
      return res.status(500).json({error: message})
    }
    return res.status(500).json({error: error.message})
  }

}

export default generateImage