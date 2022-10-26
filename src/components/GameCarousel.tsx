import { GameBanner } from "./GameBanner";
import { Game } from "../types/Game";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

interface GameCarouselProps {
  games: Game[];
  setSelectedGame: (game: Game) => void;
}

export function GameCarousel({ games, setSelectedGame }: GameCarouselProps) {
  const [sliderRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width: 540px)": {
        slides: { perView: 2.2 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3.3 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4.4 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 5.5 },
      },
    },
    slides: {
      perView: 1,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider mt-16 w-full z-0">
      {games.map((game) => (
        <div
          className="keen-slider__slide"
          key={game.id}
          onClick={() => setSelectedGame(game)}
        >
          <GameBanner game={game} />
        </div>
      ))}
    </div>
  );
}
