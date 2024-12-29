import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const PeopleLists = () => {
    const [people, setPeople] = useState([]);
    const { favorites, addToFavorites, deleteFavorite} = useContext(FavoritesContext);

    const getPeopleList = () => {
        fetch(`https://www.swapi.tech/api/people`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setPeople(response.results);
            });
    };

    useEffect(() => {
        getPeopleList();
    }, []);

    const isFavorited = (id, type) => {
        return favorites.some((favorite) => {
            return favorite.id === id && favorite.type === type;
        });
    };

    return (
        < div style={{ border: "solid grey"}} >
            <h1>People</h1>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(people) &&
                  people.map((people) => {
                    return (
                        <div key={people._id} style={{ margin: "16px"}}>
                            <h3>{people.properties.name}</h3>
                            <NavLink to={`people/${people.uid}`}>
                              <Button>View More</Button>
                            </NavLink>
                            <Button
                              onClick={() => {
                                isFavorited(people.uid, "people")
                                  ? deleteFavorite(people.uid, "people")
                                  : addToFavorites(people.uid, people.properties.name, "people");
                              }}
                            >
                                {isFavorited(people.uid, "people") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};