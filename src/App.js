import "./App.css";
import { Films } from "./pages/Films";
import { People } from "./pages/People";
import { Person } from "./pages/Person";
import { Film } from "./pages/Film";
import { Planets } from "./pages/Planets";
import { Planet } from "./pages/Planet";
import { ListPage } from "./pages/ListsPage";
import { Routes, Route } from "react-router";
import { NavBar } from "./components/NavBar";
import { Vehicles } from "./pages/Vehicles";
import { Vehicle } from "./pages/Vehicle";

export const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/film" element={<Films />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/:uid" element={<Person />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/planets/:id" element={<Planet />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<Vehicle />} />
      </Routes>
    </>
  );
};
