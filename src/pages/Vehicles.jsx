import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { NavLink } from "react-router";

export const Vehicles = () => {
    const [transports, setTransports] = useState([]);
    const getTransportsList = () => {
        fetch(`https://www.swapi.tech/api/vehicles`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setTransports(response.results);
            });
    };

    useEffect(() => {
        getTransportsList();
    }, []);

    return (
        <Container className="mt-5">
            <Badge
                className="py-3 px-3 bg-success border rounded"
                style={{
                    width: "100%",
                }}
            >
                <h1 className="mb-3 bg-success text-light d-flex align-items-center justify-content-start">
                    Vehicles List
                </h1>
            </Badge>
            {!isEmpty(transports) && transports.map((element) => (
                <NavLink to={`/vehicles/${element.uid}`} end>
                    <Container
                        className="d-flex align-items-center"
                        key={element.uid}
                    >
                        <Container className="text-light mt-1 py-2 bg-success border rounded">
                            {element.name || "Sin etiqueta"}
                        </Container>
                    </Container>
                </NavLink>
            ))}
        </Container>
    );
};