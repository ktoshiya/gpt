"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import React, { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineSend } from "react-icons/ai"; // 送信アイコンのインポート
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";
import { useAuthContext } from "./AuthContext";

interface Message {
  role: string;
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "system",
    content:
      "なにか質問してみてください。質問が理解されにくい場合は、言い換えや追加情報を提供してください。",
  },
];

const Page: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuthContext();
  const isAdmin = currentUser?.email === "admin@example.com";
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const userMessage: Message = { role: "user", content: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await currentUser?.getIdToken()}`,
      },
      body: JSON.stringify({ text: inputText, messages }),
    });

    const data = await response.json();

    const assistantMessage: Message = {
      role: "assistant",
      content: data.data,
    };
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);

    setInputText("");
    setIsLoading(false);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // チャットボックスのスクロール位置を最下部に移動する
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col flex-grow items-center h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">チャットボット</h1>
      <div className="w-full max-w-2xl ">
        <div className="bg-white shadow-md rounded p-6">
          <div
            ref={chatBoxRef}
            className="flex-grow mb-4 overflow-y-auto"
            style={{ height: "calc(100vh - 20rem)" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-indigo-500 text-white self-end"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex relative ">
            <TextareaAutosize
              value={inputText}
              onChange={handleChange}
              minRows={1}
              maxRows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
            <button
              type="submit"
              className="absolute bottom-2 right-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-500"
            >
              <AiOutlineSend size={10} /> {/* アイコンを表示 */}
            </button>
          </form>
          <Navigation />
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default Page;
