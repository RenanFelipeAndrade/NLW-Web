import { AppProps } from "next/app";
import "../styles/main.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import { GameStateContext } from "../src/context/GameStateContext";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <GameStateContext>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GameStateContext>
  );
}

export default MyApp;
