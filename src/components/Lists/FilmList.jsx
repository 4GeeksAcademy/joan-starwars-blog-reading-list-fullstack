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
        return !isEmpty(favorites) && favorites.some((favorite) => {
            return favorite.id === id && favorite.type === type;
        });
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
                            <NavLink to={`film/${film.uid}`}>
                              <Button variant="warning">View More</Button>
                            </NavLink>
                            <Button variant={itsFavorite(film.uid, "film") ? "danger" : "warning"}
                              onClick={() => {
                                itsFavorite(film.uid, "film")
                                  ? deleteFavorite(film.uid, "film")
                                  : addFavorite(film.uid, film.title, "film");
                              }}
                            >
                                {itsFavorite(film.uid, "film") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};