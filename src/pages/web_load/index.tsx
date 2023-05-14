import { useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";
import { useAuthContext } from "../AuthContext";

const Page = () => {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuthContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "/api/web_load",
        { url },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await currentUser?.getIdToken()}`,
          },
        }
      );
      setMessage(response.data.message);
      setUrl("");
    } catch (error) {
      console.error(error);
      setMessage("Error loading URL content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">URL Input Form</h1>
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded p-6">
          <form onSubmit={handleSubmit} className="flex relative">
            <input
              type="text"
              id="url"
              value={url}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              onChange={(event) => setUrl(event.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-500"
            >
              load
            </button>
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
