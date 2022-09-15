import "./styles/main.css";
import logoImage from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreatedAdBanner } from "./components/CreatedAdBanner";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/Form/Input";

interface Games {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}
[];

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
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            id={game.id}
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            ads={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreatedAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] px-10 py-8 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-lg shadow-black/25 rounded-lg">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Input
                  id="game"
                  type="text"
                  placeholder="Selecione o game que deseja jogar"
                  className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Como te chamam dentro do game?"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    id="yearsPlaying"
                    type="number"
                    placeholder="Tudo bem ser Zero"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual o seu discord?</label>
                  <Input id="discord" type="text" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      className="w-8 h-8 rounded bg-zinc-900 "
                      title="Domingo"
                    >
                      D
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900 "
                      title="Segunda"
                    >
                      S
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900 "
                      title="Terça"
                    >
                      T
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900 "
                      title="Quarta"
                    >
                      Q
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900 "
                      title="Quinta"
                    >
                      Q
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900 "
                      title="Sexta"
                    >
                      S
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900 "
                      title="Sábado"
                    >
                      S
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hourStart" placeholder="De" />
                    <Input type="time" id="hourEnd" placeholder="Até" />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" id="useVoiceChannel" />
                Costumo me conectar ao chat de voz
              </div>
              <footer className="flex flex-row justify-end gap-4 mt-4 font-semibold">
                <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 py-3 text-white rounded-md flex flex-row items-center gap-4">
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 hover:bg-violet-600 px-5 py-3 h-12 text-white rounded-md flex items-center gap-4"
                >
                  <GameController size={24} />
                  Encontar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
