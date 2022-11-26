import { NextApiRequest, NextApiResponse } from "next";
import { openAi } from "../../config/openAi.config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prompt :string = req.body.prompt;
  const genre :string = req.body.genre;
  const words:string = req.body.words;
  const { data } = await openAi.createCompletion({
    model: "text-davinci-002",
    prompt: `Create a complete random ${genre} story on the topic of ${prompt} \n\n each story should be unique \n\n each story should be at least ${words} words long. \n\n   Story: `,
    temperature: 0,
    max_tokens: 1000,
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
