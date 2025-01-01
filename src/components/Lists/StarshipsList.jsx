import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const StarshipsList = () => {
    const [starships, setStarships] = useState([]);
    const { favorites, addToFavorites, deleteFavorite} = useContext(FavoritesContext);

    const getStarshipsList = () => {
        fetch(`https://www.swapi.tech/api/starships`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setStarships(response.results);
            });
    };

    useEffect(() => {
        getStarshipsList();
    }, []);

    const isFavorited = (id, type) => {
        return favorites.some((favorite) => {
            return favorite.id === id && favorite.type === type;
        });
    };

    return (
        < div style={{ backgroundColor: "#212529", color: "#ffc107", borderLeft: "3px solid grey", borderRight: "3px solid grey", borderBottom: "3px solid grey"}} >
            <h1 style={{ paddingLeft: "5px"}}>Starships</h1>
            <div style={{ color: "white", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(starships) &&
                  starships.map((starship) => {
                    return (
                        <div key={starship.name} style={{ margin: "16px"}}>
                            <h3>{starship.name}</h3>
                            <NavLink to={`starships/${starship.uid}`}>
                              <Button variant="warning">View More</Button>
                            </NavLink>
                            <Button variant={isFavorited(starship.uid, "starships") ? "danger" : "warning"}
                              onClick={() => {
                                isFavorited(starship?.uid, "starships")
                                  ? deleteFavorite(starship.uid, "starships")
                                  : addToFavorites(starship.uid, starship.name, "starships");
                              }}
                            >
                                {isFavorited(starship?.uid, "starships") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};