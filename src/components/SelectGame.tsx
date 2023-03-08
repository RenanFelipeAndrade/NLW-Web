import * as Select from "@radix-ui/react-select";
import { CaretDown } from "phosphor-react";
import { Game } from "../types/Game";

interface SelectGameProps {
  games: Game[];
}
export function SelectGame({ games }: SelectGameProps) {
  return (
    <Select.Root name="game">
      <Select.Trigger className="flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500">
        <Select.Value placeholder="Selecione o game" className="text-white" />
        <Select.Icon>
          <CaretDown width={20} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="bg-zinc-900 py-3 px-4 text-sm text-white SelectContent"
          position="item-aligned"
        >
          <Select.Viewport className="flex flex-col gap-2">
            {games?.map((game) => (
              <Select.Item
                key={game.id}
                value={game.id}
                className="py-1 hover:bg-zinc-800"
              >
                <Select.ItemText>{game.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
