import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const PlanetsList = () => {
    const [planets, setPlanets] = useState([]);
    const { favorites, addToFavorites, deleteFavorite} = useContext(FavoritesContext);

    const getPlanetsList = () => {
        fetch(`https://www.swapi.tech/api/planets`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setPlanets(response.results);
            });
    };

    useEffect(() => {
        getPlanetsList();
    }, []);

    const isFavorited = (id, type) => {
        return favorites.some((favorite) => {
            return favorite.id === id && favorite.type === type;
        });
    };

    return (
        < div style={{ backgroundColor: "black", color: "#ffc107", border: "solid grey"}} >
            <h1>Planets</h1>
            <div style={{ color: "white", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(planets) &&
                  planets.map((planets) => {
                    return (
                        <div key={planets.name} style={{ margin: "16px"}}>
                            <h3>{planets.name}</h3>
                            <NavLink to={`planets/${planets.uid}`}>
                              <Button variant="warning">View More</Button>
                            </NavLink>
                            <Button variant={isFavorited(planets.uid, "planets") ? "danger" : "warning"}
                              onClick={() => {
                                isFavorited(planets?.uid, "planets")
                                  ? deleteFavorite(planets.uid, "planets")
                                  : addToFavorites(planets.uid, planets.name, "planets");
                              }}
                            >
                                {isFavorited(planets?.uid, "planets") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};