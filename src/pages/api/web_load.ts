import { NextApiRequest, NextApiResponse } from "next";
import { fromDocuments, webLoader } from "@utils/langchain";
import { RunMiddleware } from "./chat";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await RunMiddleware(req, res);
    const { url } = req.body;
    const web = await webLoader(url);
    await fromDocuments(web);
    res.status(200).json({
      success: true,
      message: `成功： ${url}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
