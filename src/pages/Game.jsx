import React, { useState } from "react";
import { User } from "lucide-react";
import { ChessBoard } from "@/components/ui/Chessboard";

const themes = {
  light: {
    background: "bg-gray-100",
    text: "text-gray-900",
    card: "bg-white",
    leaderboardText: "text-gray-900",
  },
  dark: {
    background: "bg-[#1e1e1e]",
    text: "text-gray-100",
    card: "bg-[#292929]",
    leaderboardText: "text-white",
  },
};

const PlayerTile = ({ name, position }) => (
  <div
    className={` m-4 flex items-center bg-opacity-80 bg-gray-800 text-white p-2 rounded-lg shadow-lg`}
  >
    <User className="mr-2" />
    <span className="font-semibold">{name}</span>
  </div>
);



const Game = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const theme = themes[currentTheme];

  return (
    <div
      className={`min-h-screen w-screen ${theme.background} ${theme.text} flex flex-col justify-center items-center`}
    >
      <PlayerTile name="Player 1"  />
      <div>
        <ChessBoard ></ChessBoard>
      </div>
      <PlayerTile name="Player 2" />
    </div>
  );
};

export default Game;
