import "./App.css";
import { Person } from "./pages/Person";
import { Film } from "./pages/Film";
import { Planet } from "./pages/Planet";
import { ListPage } from "./pages/ListsPage";
import { Routes, Route } from "react-router";
import { NavBar } from "./components/NavBar";

export const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/Films/:id" element={<Film />} />
        <Route path="/People/:uid" element={<Person />} />
        <Route path="/Planet/:id" element={<Planet />} />
      </Routes>
    </>
  );
};
