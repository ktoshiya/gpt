import {
  fetchChain,
  fromDocuments,
  fromExistingIndex,
} from "@/utils/langchain";
import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const vectorStore = await fromExistingIndex();
    // const vectorStore = await fromDocuments();
    const chain = await fetchChain(vectorStore);
    const chatResponse = await chain.call({
      query: req.body.text,
      messages: req.body.messages,
    });

    res.status(200).json({ data: chatResponse.text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default handler;
