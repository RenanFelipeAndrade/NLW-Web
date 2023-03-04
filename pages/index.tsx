import { CreateAdBanner } from "@/components/CreateAdBanner";
import { CreateAdModal } from "@/components/CreateAdModal";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { GameCarousel } from "@/components/GameCarousel";
import { SelectedGameModal } from "@/components/SelectedGameModal";
import { LoadingScreen } from "@/components/LoadingScreen";
import Image from "next/image";
// @ts-ignore
import logoImg from "../public/logo-nlw-esports.svg";
import { Game } from "@/types/Game";
import { Ad } from "@/types/Ad";
import { useRouter } from "next/router";
import { SignInCancelled } from "@/components/SignInCancelled";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

interface AppProps {
  games: Game[];
}

export default function App({ games }: AppProps) {
  const [selectedGame, setSelectedGame] = useState<Game | undefined>();
  const [ads, setAds] = useState<Ad[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { error } = useRouter().query;

  if (error === "Callback") return <SignInCancelled />;
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
    <div
      className={`max-w-[1344px] mx-auto flex items-center flex-col my-20 ${
        loading && "overflow-y-hidden"
      }`}
    >
      <Image src={logoImg} alt="logo" />
      <h1 className="sm:text-6xl text-center text-5xl px-2  text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <GameCarousel
        games={games}
        setSelectedGame={setSelectedGame}
        setAds={setAds}
        setLoading={setLoading}
      />

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} setLoading={setLoading} />
      </Dialog.Root>

      {selectedGame ? (
        <Dialog.Root
          open={true}
          onOpenChange={() => setSelectedGame(undefined)}
        >
          <SelectedGameModal
            game={selectedGame}
            ads={ads}
            setLoading={setLoading}
          />
        </Dialog.Root>
      ) : null}
      {loading && <LoadingScreen />}
      <Toaster
        toastOptions={{
          duration: 5000,
          style: { backgroundColor: "#2A2634", color: "white" },
        }}
      />
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
