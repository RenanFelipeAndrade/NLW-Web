import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import { SelectGame } from "./SelectGame";
import { DaysToggleGroup } from "./DaysToggleGroup";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Game } from "../types/Game";
import { useSession } from "next-auth/react";

interface CreateAdModalProps {
  games: Game[];
}
export function CreateAdModal({ games }: CreateAdModalProps) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const { data: session } = useSession();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!session?.user.username) return;
    if (!data.discord || !data.name) return;

    try {
      await axios.post(`http://localhost:8000/games/${data.game}/ads`, {
        name: data.name,
        discord: data.discord || session?.user.username,
        weekDays: weekDays.map(Number),
        useVoiceChannel: useVoiceChannel,
        yearsPlaying: Number(data.yearsPlaying),
        hoursStart: data.hoursStart,
        hoursEnd: data.hoursEnd,
      });
      alert("Anúncio criado com sucesso");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar anúncio");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed flex flex-col">
        <Dialog.Content className="fixed bg-[#2A2634] max-h-full sm:px-10 px-6 min-w-[300px] py-8 overflow-y-auto text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25 rounded-lg ">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>
              <SelectGame games={games} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Como te chamam dentro do game?"
                required
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  id="yearsPlaying"
                  name="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser Zero"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual o seu discord?</label>
                <Input
                  id="discord"
                  name="discord"
                  defaultValue={session?.user.username}
                  type="text"
                  placeholder="Usuario#0000"
                  required
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-2 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                <DaysToggleGroup
                  weekDays={weekDays}
                  setWeekDays={setWeekDays}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hoursStart">Qual horário do dia?</label>
                <div className="grid lg:grid-cols-2 gap-2">
                  <Input
                    type="time"
                    className="block"
                    name="hoursStart"
                    id="hoursStart"
                    placeholder="De"
                    required
                  />
                  <Input
                    type="time"
                    className="block"
                    name="hoursEnd"
                    id="hoursEnd"
                    placeholder="Até"
                    required
                  />
                </div>
              </div>
            </div>
            <label className="mt-2 flex gap-2 text-sm items-center">
              <Checkbox.Root
                name="useVoiceChannel"
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>
            <footer className="flex sm:flex-row flex-col-reverse justify-end gap-4 mt-4 font-semibold">
              <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 justify-center px-5 h-12 py-3 text-white rounded-md flex flex-row items-center gap-4 transition-colors">
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 whitespace-nowrap hover:bg-violet-600 justify-center px-5 py-3 h-12 text-white rounded-md flex items-center gap-4 transition-colors"
              >
                <GameController size={24} />
                Encontar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
