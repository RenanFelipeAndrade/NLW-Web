import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Dispatch, SetStateAction } from "react";

interface DaysToggleGroupProps {
  weekDays: string[];
  setWeekDays: Dispatch<SetStateAction<string[]>>;
}

export function DaysToggleGroup({
  weekDays,
  setWeekDays,
}: DaysToggleGroupProps) {
  return (
    <ToggleGroup.Root
      type="multiple"
      className="grid grid-cols-4 gap-2"
      onValueChange={setWeekDays}
      value={weekDays}
    >
      <ToggleGroup.Item
        className={`w-8 h-8 rounded ${
          weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
        }`}
        title="Domingo"
        value="0"
      >
        D
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={`w-8 h-8 rounded ${
          weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
        }`}
        title="Segunda"
        value="1"
      >
        S
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={`w-8 h-8 rounded ${
          weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
        }`}
        title="Terça"
        value="2"
      >
        T
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={`w-8 h-8 rounded ${
          weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
        }`}
        title="Quarta"
        value="3"
      >
        Q
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={`w-8 h-8 rounded ${
          weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
        }`}
        title="Quinta"
        value="4"
      >
        Q
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={`w-8 h-8 rounded ${
          weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
        }`}
        title="Sexta"
        value="5"
      >
        S
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={`w-8 h-8 rounded ${
          weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
        }`}
        title="Sábado"
        value="6"
      >
        S
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
