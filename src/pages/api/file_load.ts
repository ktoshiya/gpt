import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable, { IncomingForm } from "formidable";
import { filesLoader, fromDocuments } from "@/utils/langchain";

const uploadDir = path.join(process.cwd(), "files");

export const config = {
  api: {
    bodyParser: false,
  },
};

const fileUploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method not allowed. Use POST." });
    }

    const form = new IncomingForm({ uploadDir: uploadDir });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: "Error processing file upload." });
        return;
      }

      const file = files.file as formidable.File;
      const oldPath = path.join(uploadDir, file.newFilename);
      const newPath = path.join(uploadDir, file.originalFilename || "tmp");
      fs.renameSync(oldPath, newPath);
    });

    const docs = await filesLoader();
    await fromDocuments(docs);

    res.status(200).json({ message: `ファイルアップロード成功` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // アップロードされたファイルを処理した後、filesディレクトリ内のすべてのファイルを削除
    fs.readdirSync(uploadDir).forEach((file) => {
      const filePath = path.join(uploadDir, file);
      fs.unlinkSync(filePath);
    });
  }
};

export default fileUploadHandler;
