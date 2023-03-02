import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { TitleAndValue } from "../../src/components/TitleAndValue";
import {
  GameStateContextProps,
  useGameStateContext,
} from "../../src/context/GameStateContext";
import { useRouter } from "next/router";

interface SelectedGameModalProps {
  ads: Ads[];
  gameId: "string";
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
const GameDetailModal = ({ ads, gameId }: SelectedGameModalProps) => {
  const [discordObj, setDiscordObj] = useState<{ discord: string } | null>(
    null
  );
  const { selectedGame } = useGameStateContext() as GameStateContextProps;
  const { replace } = useRouter();

  const days: { [key: number]: string } = {
    0: "Domingo",
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado",
  };

  function getDiscordUsername(adId: string) {
    (async () =>
      await axios
        .get(`http://localhost:8000/ads/${adId}/discord`)
        .then((response) => setDiscordObj(response.data))
        .catch((error) => console.log(error)))();
  }

  useEffect(() => {
    if (gameId !== selectedGame?.id) {
      replace("/");
      return;
    }
  }, []);
  if (!selectedGame) return <div>opa</div>;

  return (
    <div>
      <div>
        <div className="bg-black/60 inset-0 fixed flex flex-col">
          <div className="fixed overflow-y-auto bg-[#2A2634] max-h-full sm:px-10 px-6 min-w-[300px] py-8 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25 rounded-lg ">
            <div className="text-3xl font-black">{selectedGame.name}</div>
            {ads.length > 0 ? (
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
                <div className="flex justify-end mt-2 sm:mt-4">
                  <div className="bg-zinc-500 hover:bg-zinc-600 justify-center px-5 h-12 py-3 text-white rounded-md flex flex-row items-center gap-4 transition-colors">
                    Cancelar
                  </div>
                </div>
              </div>
            ) : (
              <span className="inline-block mt-4 text-xl">
                Não há anúncios para este game
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface GetServerSidePropsWithId extends GetServerSideProps {
  params: {
    id: string;
  };
}
export async function getServerSideProps(context: GetServerSidePropsWithId) {
  const { id } = context.params;
  const ads = await axios
    .get(`http://localhost:8000/games/${id}/ads`)
    .then((response) => response.data);
  return {
    props: { ads, gameId: id },
  };
}
export default GameDetailModal;
