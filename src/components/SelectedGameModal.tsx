import { Game } from "../App";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import axios from "axios";

interface SelectedGameModalProps {
  game: Game;
}
interface Ads {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hoursStart: string;
  hoursEnd: string;
}
export function SelectedGameModal({ game }: SelectedGameModalProps) {
  const [ads, setAds] = useState<Ads[]>([]);
  const days: { [key: number]: string } = {
    0: "domingo",
    1: "segunda",
    2: "terça",
    3: "quarta",
    4: "quinta",
    5: "sexta",
    6: "sábado",
  };

  useEffect(() => {
    async function fetchAds() {
      return await axios
        .get(`http://localhost:8000/games/${game.id}/ads`)
        .then((response) => setAds(response.data))
        .catch((error) => console.log(error));
    }
    fetchAds();
  }, []);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed flex flex-col">
        <Dialog.Content className="fixed bg-[#2A2634] max-h-full sm:px-10 px-6 min-w-[300px] py-8 overflow-y-auto text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25 rounded-lg ">
          <Dialog.Title className="text-3xl font-black">
            {game.name}
          </Dialog.Title>
          <h2 className="text-xl font-semibold my-2">Ads</h2>
          <ul>
            {ads.map((ad) => (
              <li key={ad.id}>
                <div>Nome: {ad.name}</div>
                <div>Anos jogando: {ad.yearsPlaying}</div>
                <div>Usa chat de voz: {ad.useVoiceChannel ? "sim" : "não"}</div>
                <div>
                  <span>Quando joga</span>
                  <div>De: {ad.hoursEnd}</div>
                  <div>Até: {ad.hoursStart}</div>
                  <div>
                    Dias:{" "}
                    {ad.weekDays.map((day) => (
                      <span>{`${days[Number(day)]} `}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
