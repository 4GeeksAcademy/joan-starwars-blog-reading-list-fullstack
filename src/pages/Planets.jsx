import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { NavLink } from "react-router";

export const Planets = () => {
    const [worlds, setWorlds] = useState([]);
    const getWorldsList = () => {
        fetch(`https://www.swapi.tech/api/planets`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setWorlds(response.results);
            });
    };

    useEffect(() => {
        getWorldsList();
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
                    Planets List
                </h1>
            </Badge>
            {!isEmpty(worlds) && worlds.map((element) => (
                <NavLink to={`/planets/${element.uid}`} end>
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