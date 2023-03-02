import { CreateAdBanner } from "../src/components/CreateAdBanner";
import { CreateAdModal } from "../src/components/CreateAdModal";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { GameCarousel } from "../src/components/GameCarousel";
import Image from "next/image";
// @ts-ignore
import logoImg from "../public/logo-nlw-esports.svg";
import { Game } from "../src/types/Game";
import { useRouter } from "next/router";
import { SignInCancelled } from "../src/components/SignInCancelled";
import React from "react";
import {
  GameStateContextProps,
  useGameStateContext,
} from "../src/context/GameStateContext";

interface AppProps {
  games: Game[];
}

export default function App({ games }: AppProps) {
  const { setSelectedGame } = useGameStateContext() as GameStateContextProps;
  const { error } = useRouter().query;
  if (error === "Callback") return <SignInCancelled />;
  if (!games) return <></>;

  if (games.length === 0)
    return (
      <div className="text-center text-white fixed w-full top-1/2">
        <p className="font-bold text-4xl">
          Não foi possível se conectar com a Twitch
        </p>
        <p className="text-xl mt-2">
          Pedimos desculpa, em breve o problema estará resolvido
        </p>
      </div>
    );
  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <Image src={logoImg} alt="logo" />
      <h1 className="sm:text-6xl text-center text-5xl px-2  text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <GameCarousel games={games} setSelectedGame={setSelectedGame} />

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
}

export async function getServerSideProps() {
  const games = await axios
    .get("http://localhost:8000/games")
    .then((response) => response.data)
    .catch(() => []);
  return {
    props: { games },
  };
}
