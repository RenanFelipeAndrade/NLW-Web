import { Game } from "../types/Game";

export const gameToLocalStorage = (game: Game) => {
  localStorage.clear();
  localStorage.setItem("selectedGame", JSON.stringify(game));
};
