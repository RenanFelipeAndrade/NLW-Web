import { GameBanner } from "./GameBanner";
import { Game } from "../types/Game";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { KeenSliderInstance } from "keen-slider";
import { Ad } from "../types/Ad";
import { axiosInstance } from "@/global/axiosInstance";

interface GameCarouselProps {
  games: Game[];
  setSelectedGame: (game: Game) => void;
  setAds: (ads: Ad[]) => void;
  setLoading: (loading: boolean) => void;
}

export function GameCarousel({
  games,
  setSelectedGame,
  setAds,
  setLoading,
}: GameCarouselProps) {
  let intervalIds: number[] = [];
  const [sliderRef] = useKeenSlider({
    loop: true,
    created: (event) => {
      autoPlay(true, event);
    },
    dragStarted: (event) => {
      autoPlay(false, event);
    },
    dragEnded: (event) => {
      autoPlay(true, event);
    },
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

  async function handleSelectGame(game: Game) {
    setLoading(true);
    async function fetchAds() {
      return await axiosInstance
        .get(`/games/${game.id}/ads`)
        .then((response) => response.data);
    }
    try {
      const ads = await fetchAds();
      if (ads) setAds(ads);

      setSelectedGame(game);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  function autoPlay(run: boolean, event: KeenSliderInstance) {
    intervalIds.forEach((intervalId: number) => clearInterval(intervalId));
    intervalIds = [];
    if (run && intervalIds.length === 0) {
      const newIntervalId = setInterval(event.next, 5000);
      intervalIds.push(Number(newIntervalId));
    }
  }
  return (
    <div ref={sliderRef} className="keen-slider mt-16 w-full z-0">
      {games.map((game) => (
        <div
          className="keen-slider__slide"
          key={game.id}
          onClick={() => handleSelectGame(game)}
        >
          <GameBanner game={game} />
        </div>
      ))}
    </div>
  );
}
