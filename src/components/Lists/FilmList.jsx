import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const FilmList = () => {
    const [films, setFilms] = useState([]);
    const { favorites, addToFavorites, deleteFavorite} = useContext(FavoritesContext);

    const getFilmsList = () => {
        fetch(`https://www.swapi.tech/api/films`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setFilms(response.result);
            });
    };

    useEffect(() => {
        getFilmsList();
    }, []);

    const isFavorited = (id, type) => {
        return favorites.some((favorite) => {
            return favorite.id === id && favorite.type === type;
        });
    };

    return (
        < div style={{ border: "solid grey"}} >
            <h1>Films</h1>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(films) &&
                  films.map((film) => {
                    return (
                        <div key={film._id} style={{ margin: "16px"}}>
                            <h3>{film.properties.title}</h3>
                            <NavLink to={`film/${film.uid}`}>
                              <Button>View More</Button>
                            </NavLink>
                            <Button
                              onClick={() => {
                                isFavorited(film.uid, "film")
                                  ? deleteFavorite(film.uid, "film")
                                  : addToFavorites(film.uid, film.properties.title, "film");
                              }}
                            >
                                {isFavorited(film.uid, "film") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};