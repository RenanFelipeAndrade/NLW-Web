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
          <title>js</title>
        </Head>
      </>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
