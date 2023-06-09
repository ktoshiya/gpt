import "./globals.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "./AuthContext";

const App = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Head>
      <title>ChatBotに聞いてみよう</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
  </AuthProvider>
);

export default App;
