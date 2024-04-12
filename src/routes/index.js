import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import PokemonSelector from "../components/PokemonSelector";
import EVTraining from "../components/EVTraining";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/pokemon" />} />
        <Route path="/pokemon" element={<PokemonSelector />} />
        <Route path="/evs" element={<EVTraining />} />
      </Route>
    </Routes>
  );
};

export default Index;
