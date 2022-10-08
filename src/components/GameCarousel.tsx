import { GameBanner } from "./GameBanner";
import { Autoplay, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Games } from "../App";
import "swiper/css";
import "swiper/css/autoplay";
interface GameCarouselProps {
  games: Games[];
}

export function GameCarousel({ games }: GameCarouselProps) {
  return (
    <div className="mt-16 w-full z-0">
      <Swiper
        modules={[Autoplay]}
        loop
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          540: {
            slidesPerView: 2.2,
          },
          768: {
            slidesPerView: 3.3,
          },
          1024: {
            slidesPerView: 4.4,
          },
          1280: {
            slidesPerView: 5.5,
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
