"use client";
import { useMessage } from "@/hooks/useMessage";
import React, { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineSend } from "react-icons/ai"; // 送信アイコンのインポート

const Home: React.FC = () => {
  const { inputText, messages, isLoading, handleSubmit, handleChange } =
    useMessage();

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // チャットボックスのスクロール位置を最下部に移動する
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">チャットボット</h1>
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded p-6">
          <div ref={chatBoxRef} className="h-2/3 mb-4 overflow-y-auto">
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

          <form onSubmit={handleSubmit} className="flex relative">
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
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
