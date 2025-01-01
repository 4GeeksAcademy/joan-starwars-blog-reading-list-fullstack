import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router";

export const Vehicle = () => {
    const [carriage, setCarriage] = useState({});
    let { id } = useParams();

    const getCarriage = (id) => {
        fetch(`https://www.swapi.tech/api/vehicles/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setCarriage(response.result);
            });
    };

    useEffect(() => {
        getCarriage(id);
    }, []);

    return (
        <Container className="mt-2">
            {!isEmpty(carriage) && (
                <>
                    <Badge
                        className="py-3 px-3 bg-dark border rounded"
                        style={{
                            width: "100%",
                        }}
                    >
                        <h1 className="mb-3 bg-dark text-warning d-flex align-items-center justify-content-start">
                            {carriage.properties.name}
                        </h1>
                    </Badge>
                    <Container>
                        <div><strong>Model: </strong>{carriage.properties.model}</div>
                        <div><strong>Vehicle class: </strong>{carriage.properties.vehicle_class}</div>
                        <div><strong>Manufacturer: </strong>{carriage.properties.manufacturer}</div>
                        <div><strong>Max atmosphering speed: </strong>{carriage.properties.max_atmosphering_speed}</div>
                        <div><strong>Passengers: </strong>{carriage.properties.passengers}</div>
                        <div><strong>Cargo capacity: </strong>{carriage.properties.cargo_capacity}</div>
                        <div><strong>Cost in credits: </strong>{carriage.properties.cost_in_credits}</div>                         
                    </Container>
                </>
            )
            }
        </Container>
    );
};