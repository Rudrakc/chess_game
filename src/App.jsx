import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Landing from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
