import Image from "next/image";
import Link from "next/link";
import { Game } from "../types/Game";

interface GameBannerProps {
  game: Game;
  className?: string;
}

export function GameBanner({ game, className }: GameBannerProps) {
  const width = 200;
  const height = 300;
  const imgUrl = game.box_art_url
    .replace("{width}", width.toString())
    .replace("{height}", height.toString());

  return (
    <section
      className={`overflow-hidden justify-center flex cursor-pointer ${
        className && className
      }`}
    >
      <div className="relative">
        <Image
          src={imgUrl}
          alt=""
          width={width}
          height={height}
          className="rounded-lg"
        />
        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0 rounded-b-lg">
          <strong className="font-bold text-white">{game.name}</strong>
          <span className="text-sm text-zinc-300 block">
            {`${game.ads} anúncio(s)`}
          </span>
        </div>
      </div>
    </section>
  );
}
