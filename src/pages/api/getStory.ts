import { NextApiRequest, NextApiResponse } from "next";
import { openAi } from "../../config/openAi.config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prompt :string = req.body.prompt;
  const { data } = await openAi.createCompletion({
    model: "text-davinci-002",
    prompt: `Create a random story on the topic of ${prompt}`,
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  
  if (data) {
    res.status(200).json(data["choices"][0]["text"]);
  } else {
    res.status(500).json({ error: "No data fetched" });
  }
};