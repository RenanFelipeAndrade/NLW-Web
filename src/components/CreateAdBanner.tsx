import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dailog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 mx-6">
      <div className="bg-[#2A2634] px-8 py-6 self-stretch rounded-b-lg flex sm:flex-row flex-col gap-6 items-center justify-between">
        <div>
          <strong className="text-2xl text-white font-black">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 sm:block hidden">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dailog.Trigger className="bg-violet-500 hover:bg-violet-600 px-4 py-3 text-white rounded flex flex-row items-center sm:w-fit justify-center gap-4 w-full max-w-[375px]">
          <MagnifyingGlassPlus size="24" />
          <span className="whitespace-nowrap">Publicar anúncio</span>
        </Dailog.Trigger>
      </div>
    </div>
  );
}
