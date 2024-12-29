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
        <Container className="mt-5">
            {!isEmpty(carriage) && (
                <>
                    <Badge
                        className="py-3 px-3 bg-success border rounded"
                        style={{
                            width: "100%",
                        }}
                    >
                        <h1 className="mb-3 bg-success text-light d-flex align-items-center justify-content-start">
                            {carriage.properties.model}
                        </h1>
                    </Badge>
                    <Container>
                        <div>Vehicle class: {carriage.properties.vehicle_class}</div>
                        <div>Manufacturer: {carriage.properties.manufacturer}</div>
                        <div>Max atmosphering speed: {carriage.properties.max_atmosphering_speed}</div>
                        <div>Passengers: {carriage.properties.passengers}</div>
                        <div>Cargo capacity: {carriage.properties.cargo_capacity}</div>                        
                    </Container>
                </>
            )
            }
        </Container>
    );
};