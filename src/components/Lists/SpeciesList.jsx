import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const SpeciesList = () => {
    const [species, setSpecies] = useState([]);
    const { favorites, addToFavorites, deleteFavorite} = useContext(FavoritesContext);

    const getSpeciesList = () => {
        fetch(`https://www.swapi.tech/api/species`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setSpecies(response.results);
            });
    };

    useEffect(() => {
        getSpeciesList();
    }, []);

    const isFavorited = (id, type) => {
        return favorites.some((favorite) => {
            return favorite.id === id && favorite.type === type;
        });
    };

    return (
        < div style={{ backgroundColor: "#212529", color: "#ffc107", borderLeft: "3px solid grey", borderRight: "3px solid grey", borderBottom: "3px solid grey"}} >
            <h1 style={{ paddingLeft: "5px"}}>Species</h1>
            <div style={{ color: "white", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(species) &&
                  species.map((specie) => {
                    return (
                        <div key={specie.name} style={{ margin: "16px"}}>
                            <h3>{specie.name}</h3>
                            <NavLink to={`species/${specie.uid}`}>
                              <Button variant="warning">View More</Button>
                            </NavLink>
                            <Button variant={isFavorited(specie.uid, "species") ? "danger" : "warning"}
                              onClick={() => {
                                isFavorited(specie?.uid, "species")
                                  ? deleteFavorite(specie.uid, "species")
                                  : addToFavorites(specie.uid, specie.name, "species");
                              }}
                            >
                                {isFavorited(specie.uid, "species") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};