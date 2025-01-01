import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router";

export const Starship = () => {
    const [spaceCraft, setSpaceCraft] = useState({});
    let { id } = useParams();

    const getSpaceCraft = (id) => {
        fetch(`https://www.swapi.tech/api/starships/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setSpaceCraft(response.result);
            });
    };

    useEffect(() => {
        getSpaceCraft(id);
    }, []);

    return (
        <Container className="mt-2">
            {!isEmpty(spaceCraft) && (
                <>
                    <Badge
                        className="py-3 px-3 bg-dark border rounded"
                        style={{
                            width: "100%",
                        }}
                    >
                        <h1 className="mb-3 bg-dark text-warning d-flex align-items-center justify-content-start">
                            {spaceCraft.properties.name}
                        </h1>
                    </Badge>
                    <Container>
                        <div><strong>Model: </strong>{spaceCraft.properties.model}</div>
                        <div><strong>Starship class: </strong>{spaceCraft.properties.starship_class}</div>
                        <div><strong>Manufacturer: </strong>{spaceCraft.properties.manufacturer}</div>
                        <div><strong>Max atmosphering speed: </strong>{spaceCraft.properties.max_atmosphering_speed}</div>
                        <div><strong>Hyperdrive rating: </strong>{spaceCraft.properties.hyperdrive_rating}</div>
                        <div><strong>Passengers: </strong>{spaceCraft.properties.passengers}</div>
                        <div><strong>Cargo capacity: </strong>{spaceCraft.properties.cargo_capacity}</div>
                        <div><strong>Cost in credits: </strong>{spaceCraft.properties.cost_in_credits}</div>                         
                    </Container>
                </>
            )
            }
        </Container>
    );
};