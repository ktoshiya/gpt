import { NextApiRequest, NextApiResponse } from "next";
import { fromDocuments, setDocument, webLoader } from "@utils/langchain";
import { RunMiddleware } from "./chat";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await RunMiddleware(req, res);
    const { title, body } = req.body;
    const doc = await setDocument(title, body);
    await fromDocuments([doc]);
    res.status(200).json({
      success: true,
      message: `成功： ${title}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
