import { Game } from "../App";

export function GameBanner(props: Game) {
  const imgUrl = props.box_art_url
    .replace("{width}", "200")
    .replace("{height}", "300");

  return (
    <section className="overflow-hidden justify-center flex cursor-pointer">
      <div className="relative">
        <img src={imgUrl} alt="" className="rounded-lg" />
        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0 rounded-b-lg">
          <strong className="font-bold text-white">{props.name}</strong>
          <span className="text-sm text-zinc-300 block">
            {`${props.ads} anúncio(s)`}
          </span>
        </div>
      </div>
    </section>
  );
}
