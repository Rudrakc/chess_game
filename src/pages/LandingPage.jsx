import React, { useState } from "react";
import { Sun, Moon, User, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IconButton from "@/components/ui/IconButton";
import { themes } from "@/assets/themes";
  
  const leaderboardData = [
    { name: "Alice", points: 1200 },
    { name: "Bob", points: 1150 },
    { name: "Charlie", points: 1100 },
    { name: "David", points: 1050 },
    { name: "Eve", points: 1000 },
  ];


const LandingPage = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };
  
  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen w-screen ${theme.background} ${theme.text}`}>
      <header className="flex justify-between items-center p-4 px-10">
        <h1 className="text-2xl font-bold">Chess Master</h1>
        <div className="flex items-center gap-4 px-4">
          <IconButton onClick={toggleTheme}>
            {currentTheme === "dark" ? <Sun /> : <Moon />}
          </IconButton>
          <IconButton>
            <User />
          </IconButton>
        </div>
      </header>

      <main className="container mx-auto mt-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to Chess Master</h2>
        <p className="text-xl mb-8">
          Experience real-time chess like never before!
        </p>

        <Button size="lg" className="mb-8">
          Join Game
        </Button>

        <Card className={`${theme.card} max-w-md mx-auto border-none`}>
          <CardHeader>
            <CardTitle
              className={`flex items-center justify-center ${
                currentTheme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <Trophy className="mr-2" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {leaderboardData.map((player, index) => (
                <li
                  key={player.name}
                  className={`flex justify-between items-center p-2 rounded-lg transition-all duration-300 ease-in-out ${
                    index === 0
                      ? "bg-yellow-400 text-black font-bold"
                      : index === 1
                      ? "bg-gray-300 text-black font-semibold"
                      : index === 2
                      ? "bg-orange-300 text-black font-semibold"
                      : `hover:bg-opacity-10 hover:bg-white ${theme.leaderboardText}`
                  } `}
                >
                  <span className="flex items-center">
                    {index + 1}.
                    {index < 3 && (
                      <span className="ml-2">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                      </span>
                    )}
                    <span className="ml-2">{player.name}</span>
                  </span>
                  <span>{player.points} points</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LandingPage;
