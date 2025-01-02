import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const PlanetsList = () => {
    const [planets, setPlanets] = useState([]);
    const { favorites, addFavorite, deleteFavorite} = useContext(FavoritesContext);

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

    const itsFavorite = (id, type) => {
        return favorites.some((favorite) => {
            return favorite.id === id && favorite.type === type;
        });
    };

    return (
        < div style={{ backgroundColor: "#212529", color: "#ffc107", borderLeft: "3px solid grey", borderRight: "3px solid grey", borderBottom: "3px solid grey"}} >
            <h1 style={{ paddingLeft: "5px"}}>Planets</h1>
            <div style={{ color: "white", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(planets) &&
                  planets.map((planets) => {
                    return (
                        <div key={planets.name} style={{ margin: "16px"}}>
                            <h3>{planets.name}</h3>
                            <NavLink to={`planets/${planets.uid}`}>
                              <Button variant="warning">View More</Button>
                            </NavLink>
                            <Button variant={itsFavorite(planets.uid, "planets") ? "danger" : "warning"}
                              onClick={() => {
                                itsFavorite(planets?.uid, "planets")
                                  ? deleteFavorite(planets.uid, "planets")
                                  : addFavorite(planets.uid, planets.name, "planets");
                              }}
                            >
                                {itsFavorite(planets?.uid, "planets") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};