import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { TitleAndValue } from "./TitleAndValue";
import { Game } from "../types/Game";
import { Ad } from "../types/Ad";
import { XCircle } from "phosphor-react";
import { axiosInstance } from "@/global/axiosInstance";
import { toast } from "react-hot-toast";

interface SelectedGameModalProps {
  game: Game;
  ads: Ad[];
  setLoading: (loading: boolean) => void;
}
export function SelectedGameModal({
  game,
  ads,
  setLoading,
}: SelectedGameModalProps) {
  const [discordObj, setDiscordObj] = useState<{ discord: string }>({
    discord: "",
  });

  const days: { [key: number]: string } = {
    0: "Domingo",
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado",
  };

  async function getDiscordUsername(adId: string) {
    if (discordObj.discord) return;
    setLoading(true);
    try {
      const ads = await axiosInstance
        .get(`/ads/${adId}/discord`)
        .then((response) => setDiscordObj(response.data));
      setLoading(false);
      return ads;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  function formatDayString(day: number) {
    return days[day].slice(0, 3) + "; ";
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed flex flex-col">
        <Dialog.Content className="fixed overflow-y-auto bg-[#2A2634] max-h-full sm:px-10 px-6 min-w-[300px] py-8 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25 rounded-lg ">
          <Dialog.Title className="flex gap-2 text-2xl sm:text-3xl font-black justify-between">
            <span>{game.name}</span>
            <Dialog.Close className="flex items-center justify-center">
              <XCircle />
            </Dialog.Close>
          </Dialog.Title>
          {ads.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold my-2">Anúncios</h2>
              <ul
                className={`grid lg:grid-cols-2 gap-2 lg:gap-4 justify-items-center`}
              >
                {ads.map((ad, index) => (
                  <li
                    key={index}
                    className={`bg-zinc-900 p-4 sm:px-6 sm:py-4 rounded flex flex-col w-full max-w-xs gap-2 justify-content-center ${
                      index === ads.length - 1 && "col-span-2"
                    }`}
                  >
                    <div className="text-center font-semibold text-xl mb-2">
                      {ad.name}
                    </div>
                    <TitleAndValue title="Discord" className="text-[#5865F2]">
                      {discordObj.discord.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(discordObj.discord);
                            toast.success(
                              "Copiado para a área de transferência"
                            );
                          }}
                        >
                          {discordObj.discord}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => getDiscordUsername(ad.id)}
                        >
                          Ver o nick
                        </button>
                      )}
                    </TitleAndValue>
                    <TitleAndValue title="Anos jogando">
                      {ad.yearsPlaying > 0 ? ad.yearsPlaying : "novato"}
                    </TitleAndValue>
                    <TitleAndValue title="Chat de voz?">
                      {ad.useVoiceChannel ? "Sim" : "Não"}
                    </TitleAndValue>
                    <TitleAndValue title="Online nos dias">
                      {ad.weekDays.map((day, index) => (
                        <span key={index}>{formatDayString(Number(day))}</span>
                      ))}
                      <div>
                        {ad.hoursEnd} - {ad.hoursStart}
                      </div>
                    </TitleAndValue>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span className="inline-block mt-4 text-xl">
              Não há anúncios para este game
            </span>
          )}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
