import "./styles/main.css";
import logoImage from "./assets/logo-nlw-esports.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { GameCarousel } from "./components/GameCarousel";
import "swiper/css";

export interface Games {
  id: string;
  name: string;
  box_art_url: string;
  ads: number;
}

function App() {
  const [games, setGames] = useState<Games[]>([]);

  useEffect(() => {
    const fetchData = async () =>
      await axios
        .get("http://localhost:8000/games")
        .then((response) => setGames(response.data))
        .catch((error) => console.log(error));

    fetchData();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImage} alt="logo" />
      <h1 className="sm:text-6xl text-center text-5xl px-2  text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <GameCarousel games={games} />

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
}

export default App;
