import { MagnifyingGlassPlus, SignOut } from "phosphor-react";
import * as Dailog from "@radix-ui/react-dialog";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
// @ts-ignore
import discordLogo from "../../public/discord-logo.svg";

export function CreateAdBanner() {
  const { data: session } = useSession();
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 mx-6">
      <div className="bg-[#2A2634] px-8 py-6 self-stretch rounded-b-lg flex sm:flex-row flex-col gap-6 items-center justify-between">
        <div>
          <strong className="text-2xl text-white font-black">
            Não encontrou seu duo
            {session?.user && (
              <span className="text-violet-500">{` ${session.user.name}`}</span>
            )}
            ?
          </strong>
          <span className="text-zinc-400 sm:block hidden">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        {session ? (
          <div className="sm:gap-4 md:flex-row flex flex-col gap-2">
            <Dailog.Trigger className="bg-violet-500 hover:bg-violet-600 px-4 py-3 text-white rounded flex flex-row items-center justify-center gap-4 w-full max-w-[375px] transition-colors">
              <MagnifyingGlassPlus size="24" />

              <span className="whitespace-nowrap">Publicar anúncio</span>
            </Dailog.Trigger>
            <button
              onClick={() => signOut()}
              className="bg-zinc-500 hover:bg-zinc-600 px-4 py-3 text-white rounded flex flex-row items-center justify-center gap-4 w-full transition-colors"
            >
              <SignOut size={24} /> Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("discord")}
            className="bg-[#5865F2] hover:bg-[#4855Df] px-4 py-3 text-white rounded flex flex-row items-center sm:w-fit justify-center gap-4 w-full transition-colors"
          >
            <Image
              src={discordLogo}
              width="32px"
              height="32px"
              alt="discord logo"
            />
            Login com discord
          </button>
        )}
      </div>
    </div>
  );
}
