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
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/planets`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setPlanets(response.content);
            });
    };

    useEffect(() => {
        getPlanetsList();
    }, []);

    const itsFavorite = (id, type) => {
        return !isEmpty(favorites) && favorites.some((favorite) => {
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
                            <NavLink to={`Planet/${planets.ID}`}>
                              <Button variant="warning">View More</Button>
                            </NavLink>
                            <Button variant={itsFavorite(planets.ID, "Planet") ? "danger" : "warning"}
                              onClick={() => {
                                itsFavorite(planets?.external_ID, "Planet")
                                  ? deleteFavorite(planets.external_ID, "Planet")
                                  : addFavorite(planets.external_ID, planets.name, "Planet");
                              }}
                            >
                                {itsFavorite(planets?.ID, "Planet") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};