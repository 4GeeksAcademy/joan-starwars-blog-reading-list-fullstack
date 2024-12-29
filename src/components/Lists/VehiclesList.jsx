import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const VehiclesLists = () => {
    const [vehicles, setVehicles] = useState([]);
    const { favorites, addToFavorites, deleteFavorite} = useContext(FavoritesContext);

    const getVehiclesList = () => {
        fetch(`https://www.swapi.tech/api/vehicles`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setVehicles(response.results);
            });
    };

    useEffect(() => {
        getVehiclesList();
    }, []);

    const isFavorited = (id, type) => {
        return favorites.some((favorite) => {
            return favorite.id === id && favorite.type === type;
        });
    };

    return (
        < div style={{ border: "solid grey"}} >
            <h1>Vehicles</h1>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(vehicles) &&
                  vehicles.map((vehicle) => {
                    return (
                        <div key={vehicle._id} style={{ margin: "16px"}}>
                            <h3>{vehicle.properties.model}</h3>
                            <NavLink to={`vehicles/${vehicle.uid}`}>
                              <Button>View More</Button>
                            </NavLink>
                            <Button
                              onClick={() => {
                                isFavorited(vehicle.uid, "vehicles")
                                  ? deleteFavorite(vehicle.uid, "vehicles")
                                  : addToFavorites(vehicle.uid, vehicle.properties.model, "vehicles");
                              }}
                            >
                                {isFavorited(vehicle.uid, "vehicles") ? "UnFav" : "Fav"}
                            </Button>
                        </div>
                    );
                  })}
            </div>
        </div>
    );
};