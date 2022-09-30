import { GameBanner } from "./GameBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Games } from "../App";

interface GameCarouselProps {
  games: Games[];
}

export function GameCarousel({ games }: GameCarouselProps) {
  return (
    <div className="mt-16 w-full">
      <Swiper
        slidesPerView={1}
        breakpoints={{
          540: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <GameBanner
              id={game.id}
              name={game.name}
              box_art_url={game.box_art_url}
              ads={game.ads}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
