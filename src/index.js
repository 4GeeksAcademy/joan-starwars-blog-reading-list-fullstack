import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { FavoritesProvider } from "./context/Favorites";
import "./index.css";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
