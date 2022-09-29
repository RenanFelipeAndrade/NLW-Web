import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import { Games } from "../App";
import { SelectGame } from "./SelectGame";
import { DaysToggleGroup } from "./DaysToggleGroup";
import { FormEvent, useState } from "react";
import axios from "axios";

interface CreateAdModalProps {
  games: Games[];
}
export function CreateAdModal({ games }: CreateAdModalProps) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) return;

    try {
      await axios
        .post(`http://localhost:8000/games/${data.game}/ads`, {
          name: data.name,
          discord: data.discord,
          weekDays: weekDays.map(Number),
          useVoiceChannel: useVoiceChannel,
          yearsPlaying: Number(data.yearsPlaying),
          hoursStart: data.hoursStart,
          hoursEnd: data.hoursEnd,
        })
        .then((response) => console.log(response));
      alert("Anúncio criado com sucesso");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar anúncio");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] px-10 py-8 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-lg shadow-black/25 rounded-lg">
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
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser Zero"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <DaysToggleGroup weekDays={weekDays} setWeekDays={setWeekDays} />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hoursStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  name="hoursStart"
                  id="hoursStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  name="hoursEnd"
                  id="hoursEnd"
                  placeholder="Até"
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
  );
}
