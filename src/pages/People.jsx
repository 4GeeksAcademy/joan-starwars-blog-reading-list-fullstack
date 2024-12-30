import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { NavLink } from "react-router";

export const People = () => {
    const [persons, setPersons] = useState([]);
    const getPersonsList = () => {
        fetch(`https://www.swapi.tech/api/people`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setPersons(response.results);
            });
    };

    useEffect(() => {
        getPersonsList();
    }, []);

    return (
        <Container className="mt-5">
            <Badge
                className="py-3 px-3 bg-success border rounded"
                style={{
                    width: "100%",
                }}
            >
                <h1 className="mb-3 bg-sucess text-light d-flex align-items-center justify-content-start">
                    People List
                </h1>
            </Badge>
            {!isEmpty(persons) && persons.map((element) => (
                <NavLink to={`/people/${element.uid}`} end>
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