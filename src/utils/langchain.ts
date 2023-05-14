import { PineconeClient } from "@pinecone-database/pinecone";

import { VectorDBQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { PineconeStore } from "langchain/vectorstores/pinecone";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";

const client = new PineconeClient();

// 既存のpineconeから取得する場合
export const fromExistingIndex = async () => {
  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENVIRONMENT as string,
  });
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string);
  return await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), {
    pineconeIndex,
  });
};

// webから取得する場合
export const webLoader = async (url: string) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
  });

  return await loader.load();
};

// fileから取得する場合
export const filesLoader = async () => {
  const loader = new DirectoryLoader("file", {
    ".txt": (path) => new TextLoader(path),
    ".html": (path) => new TextLoader(path),
    ".pdf": (path) => new PDFLoader(path),
  });

  return await loader.load();
};

// ファイルを読み込む場合
export const fromDocuments = async () => {
  const result = await filesLoader();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 200,
  });

  const documents = await textSplitter.splitDocuments(result);

  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENVIRONMENT as string,
  });
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string);
  return PineconeStore.fromDocuments(documents, new OpenAIEmbeddings(), {
    pineconeIndex,
  });
};

export const fetchChain = async (vectorStore: PineconeStore) => {
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
  return VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 5,
    returnSourceDocuments: true,
  });
};
