import { GameBanner } from "./GameBanner";
import { Game } from "../types/Game";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
interface GameCarouselProps {
  games: Game[];
  setSelectedGame: (game: Game) => void;
}

export function GameCarousel({ games, setSelectedGame }: GameCarouselProps) {
  const [sliderRef] = useKeenSlider();
  return (
    <div ref={sliderRef} className="keen-slider mt-16 w-full z-0">
      {games.map((game) => (
        <div className="keen-slider__slide">
          <GameBanner game={game} />
        </div>
      ))}
    </div>
  );
}
