import { useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";

const Page = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/text_load", { title, body });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error loading URL content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Text Input Form</h1>
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded p-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                タイトル
              </label>
              <input
                type="text"
                id="title"
                value={title}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                本文
              </label>
              <textarea
                id="body"
                value={body}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                onChange={(event) => setBody(event.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-500"
              >
                load
              </button>
            </div>
          </form>

          {message && <p>{message}</p>}
          <Navigation />
          {isLoading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default Page;
