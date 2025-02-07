import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const PeopleList = () => {
    const [people, setPeople] = useState([]);
    const { favorites, addFavorite, deleteFavorite} = useContext(FavoritesContext);

    const getPeopleList = () => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/people`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setPeople(response.content);
            });
    };

    useEffect(() => {
        getPeopleList();
    }, []);

    const itsFavorite = (id, type) => {
        return !isEmpty(favorites) && favorites.some((favorite) => {
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
                            <Button variant={itsFavorite(people.uid, "people") ? "danger" : "warning"}
                              onClick={() => {
                                itsFavorite(people.uid, "people")
                                  ? deleteFavorite(people.uid, "people")
                                  : addFavorite(people.uid, people.name, "people");
                              }}
                            >
                                {itsFavorite(people?.uid, "people") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};