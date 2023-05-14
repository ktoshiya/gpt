import { verifyIdToken } from "@/utils/firebaseAdmin";
import {
  fetchChain,
  fromDocuments,
  fromExistingIndex,
} from "@/utils/langchain";
import { NextApiRequest, NextApiResponse } from "next";

export const RunMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decodedToken = await verifyIdToken(token);
  if (!decodedToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await RunMiddleware(req, res);
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
