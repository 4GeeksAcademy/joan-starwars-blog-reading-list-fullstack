import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const FilmList = () => {
    const [films, setFilms] = useState([]);
    const { favorites, addFavorite, deleteFavorite} = useContext(FavoritesContext);

    const getFilmsList = () => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/films`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setFilms(response.content);
            });
    };

    useEffect(() => {
        getFilmsList();
    }, []);

    const itsFavorite = (id, type) => {
        return favorites.some((favorite) => {
            return favorite.external_ID === id && favorite.type === type;
        });
    };

    const mapFavorite = (id, type) => {
        const favorite = favorites.find(obj => obj.external_ID === id && obj.type === type) || null;
        return favorite.ID;
    };

    return (
        < div style={{ backgroundColor: "#212529", color: "#ffc107", border: "solid grey"}} >
            <h1 style={{ paddingLeft: "5px"}}>Films</h1>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(films) &&
                  films.map((film) => {
                    return (
                        <div key={film.ID} style={{ color: "white", margin: "16px"}}>
                            <h3 >{film.title}</h3>
                            <NavLink to={`Films/${film.ID}`}>
                              <Button variant="warning">View More</Button>
                            </NavLink>
                            <Button variant={itsFavorite(film.ID, "Films") ? "danger" : "warning"}
                              onClick={() => {
                                itsFavorite(film.ID, "Films")
                                  ? deleteFavorite(mapFavorite(film.ID, "Films"), "Films")
                                  : addFavorite(film.ID, film.title, "Films");
                              }}
                            >
                                {itsFavorite(film.ID, "Films") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};