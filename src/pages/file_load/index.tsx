import { useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/api/file_load", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage(response.data.message);
        setFile(null);
      } catch (error) {
        console.error(error);
        setMessage("Error uploading file.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">File Input Form</h1>
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded p-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                ファイル
              </label>
              <input
                type="file"
                id="file"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(event) =>
                  setFile(event.target.files ? event.target.files[0] : null)
                }
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
