import { useEffect, useState } from "react";
import { useContext } from "react";
import { isEmpty } from "lodash";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { FavoritesContext } from "../../context/Favorites";

export const VehiclesList = () => {
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
        < div style={{ backgroundColor: "black", color: "#ffc107", border: "solid grey"}} >
            <h1>Vehicles</h1>
            <div style={{ color: "white", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {!isEmpty(vehicles) &&
                  vehicles.map((vehicle) => {
                    return (
                        <div key={vehicle.name} style={{ margin: "16px"}}>
                            <h3>{vehicle.name}</h3>
                            <NavLink to={`vehicles/${vehicle.uid}`}>
                              <Button variant="warning">View More</Button>
                            </NavLink>
                            <Button variant={isFavorited(vehicle.uid, "vehicles") ? "danger" : "warning"}
                              onClick={() => {
                                isFavorited(vehicle.uid, "vehicles")
                                  ? deleteFavorite(vehicle.uid, "vehicles")
                                  : addToFavorites(vehicle.uid, vehicle.name, "vehicles");
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