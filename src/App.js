import "./App.css";
import { Person } from "./pages/Person";
import { Film } from "./pages/Film";
import { Planet } from "./pages/Planet";
import { ListPage } from "./pages/ListsPage";
import { Routes, Route } from "react-router";
import { NavBar } from "./components/NavBar";
import { Specie } from "./pages/Specie";
import { Starship } from "./pages/Starship";
import { Vehicle } from "./pages/Vehicle";

export const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/people/:uid" element={<Person />} />
        <Route path="/planets/:id" element={<Planet />} />
        <Route path="/vehicles/:id" element={<Vehicle />} />
        <Route path="/species/:id" element={<Specie />} />
        <Route path="/starships/:id" element={<Starship />} />
      </Routes>
    </>
  );
};
