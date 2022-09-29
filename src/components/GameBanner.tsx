import { Games } from "../App";

export function GameBanner(props: Games) {
  const imgUrl = props.box_art_url
    .replace("{width}", "200")
    .replace("{height}", "300");

  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={imgUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0">
        <strong className="font-bold text-white">{props.name}</strong>
        <span className="text-sm text-zinc-300 block">
          {`${props.ads} anúncio(s)`}
        </span>
      </div>
    </a>
  );
}
