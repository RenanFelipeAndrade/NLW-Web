import { Game } from "../App";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { TitleAndValue } from "./TitleAndValue";

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
  const [discordObj, setDiscordObj] = useState<{ discord: string } | null>(
    null
  );

  const days: { [key: number]: string } = {
    0: "Domingo",
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado",
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

  function getDiscordUsername(adId: string) {
    (async () =>
      await axios
        .get(`http://localhost:8000/ads/${adId}/discord`)
        .then((response) => setDiscordObj(response.data))
        .catch((error) => console.log(error)))();
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed flex flex-col">
        <Dialog.Content className="fixed overflow-y-auto bg-[#2A2634] max-h-full sm:px-10 px-6 min-w-[300px] py-8 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25 rounded-lg ">
          <Dialog.Title className="text-3xl font-black">
            {game.name}
          </Dialog.Title>
          <div>
            <h2 className="text-xl font-semibold my-2">Anúncios</h2>
            <ul className="flex flex-col gap-2 ">
              {ads.map((ad, index) => (
                <li
                  key={index}
                  className="bg-zinc-900 p-4 sm:px-6 sm:py-4 rounded flex flex-col gap-2"
                >
                  <div className="text-center font-semibold text-xl mb-2">
                    {ad.name}
                  </div>
                  <TitleAndValue title="Discord" className="text-[#5865F2]">
                    <button
                      type="button"
                      onClick={() => getDiscordUsername(ad.id)}
                    >
                      {discordObj !== null && discordObj.discord.length > 0
                        ? discordObj?.discord
                        : "Ver o nick"}
                    </button>
                  </TitleAndValue>
                  <TitleAndValue title="Anos jogando">
                    {ad.yearsPlaying > 0 ? ad.yearsPlaying : "novato"}
                  </TitleAndValue>
                  <TitleAndValue title="Chat de voz?">
                    {ad.useVoiceChannel ? "Sim" : "Não"}
                  </TitleAndValue>
                  <TitleAndValue title="Online nos dias">
                    {ad.weekDays.map((day, index) => (
                      <span key={index}>{`${days[Number(day)]}; `}</span>
                    ))}
                    <div>
                      {ad.hoursEnd} - {ad.hoursStart}
                    </div>
                  </TitleAndValue>
                </li>
              ))}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
