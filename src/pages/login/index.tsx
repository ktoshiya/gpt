"use client";

import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/utils/firebaseClient";
import { useRouter } from "next/router";
import { useAuthContext } from "../AuthContext";

const Page: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const login = async () => {
    if (!email) return;
    if (!password) return;

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">ログイン</h1>
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded p-6">
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="メールアドレス"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="パスワード"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-500"
              onClick={() => {
                login();
              }}
            >
              ログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
