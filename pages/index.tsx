import { CreateAdBanner } from "../src/components/CreateAdBanner";
import { CreateAdModal } from "../src/components/CreateAdModal";
import { useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { GameCarousel } from "../src/components/GameCarousel";
import { SelectedGameModal } from "../src/components/SelectedGameModal";
import Image from "next/image";
// @ts-ignore
import logoImg from "../public/logo-nlw-esports.svg";
import { Game } from "../src/types/Game";
import { useRouter } from "next/router";
import { SignInCancelled } from "../src/components/SignInCancelled";

interface AppProps {
  games: Game[];
}

export default function App({ games }: AppProps) {
  const [selectedGame, setSelectedGame] = useState<Game | undefined>();
  const { error } = useRouter().query;
  if (error === "Callback") return <SignInCancelled />;

  if (!games) return <></>;
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

      {selectedGame ? (
        <Dialog.Root
          open={true}
          onOpenChange={() => setSelectedGame(undefined)}
        >
          <SelectedGameModal game={selectedGame} />
        </Dialog.Root>
      ) : null}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:8000/games");
  const games = response.data;
  return {
    props: { games },
  };
}
