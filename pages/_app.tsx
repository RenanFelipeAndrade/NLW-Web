import { AppProps } from "next/app";
import "../styles/main.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import Head from "next/head";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <>
        <Head>
          <link
            rel="shortcut icon"
            href="logo-nlw-esports.svg"
            type="image/svg"
          />
          <title>NLW - Web</title>
        </Head>
      </>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
