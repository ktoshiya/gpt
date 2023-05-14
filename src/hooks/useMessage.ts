import { useState, FormEvent, ChangeEvent } from "react";

interface Message {
  role: string;
  content: string;
}

export type UseMessageReturnType = {
  readonly inputText: string;
  readonly messages: Message[];
  readonly isLoading: boolean;
  readonly handleSubmit: (event: FormEvent) => Promise<void>;
  readonly handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const useMessage = (): UseMessageReturnType => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "なにか質問してみてください。質問が理解されにくい場合は、言い換えや追加情報を提供してください。",
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const userMessage: Message = { role: "user", content: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  return {
    inputText,
    messages,
    isLoading,
    handleSubmit,
    handleChange,
  };
};
