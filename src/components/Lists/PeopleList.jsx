import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const PeopleList = () => {
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
        < div style={{ backgroundColor: "#212529", color: "#ffc107", borderLeft: "3px solid grey", borderRight: "3px solid grey", borderBottom: "3px solid grey"}} >
            <h1 style={{ paddingLeft: "5px"}}>People</h1>
            <div style={{ color: "white", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(people) &&
                  people.map((people) => {
                    return (
                        <div key={people.name} style={{ margin: "16px"}}>
                            <h3>{people.name}</h3>
                            <NavLink to={`people/${people.uid}`}>
                              <Button variant="warning">View More</Button>
                            </NavLink>
                            <Button variant={isFavorited(people.uid, "people") ? "danger" : "warning"}
                              onClick={() => {
                                isFavorited(people.uid, "people")
                                  ? deleteFavorite(people.uid, "people")
                                  : addToFavorites(people.uid, people.name, "people");
                              }}
                            >
                                {isFavorited(people?.uid, "people") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};