import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Game } from "../types/Game";
import { gameToLocalStorage } from "../utils/gameToLocalStorage";

export interface GameStateContextProps {
  selectedGame: Game | undefined;
  setSelectedGame: (game: Game) => void;
}

interface GameStateContextWithChildren {
  children: ReactNode;
}

const Context = createContext<GameStateContextProps | null>(null);

export const GameStateContext = ({
  children,
}: GameStateContextWithChildren) => {
  const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined);
  useEffect(() => {
    if (!selectedGame) {
      const game = localStorage.getItem("selectedGame");
      if (game) setSelectedGame(JSON.parse(game));
    } else {
      gameToLocalStorage(selectedGame);
    }
  }, []);

  return (
    <Context.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </Context.Provider>
  );
};

export const useGameStateContext = () => {
  return useContext(Context);
};
