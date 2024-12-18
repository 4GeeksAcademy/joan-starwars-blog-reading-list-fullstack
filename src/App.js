import "./App.css";
import { Films } from "./pages/Films";
import { Film } from "./pages/Film";
import { Routes, Route } from "react-router";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Films />} />
      <Route path="/film/:id" element={<Film />} />
    </Routes>
  );
};
