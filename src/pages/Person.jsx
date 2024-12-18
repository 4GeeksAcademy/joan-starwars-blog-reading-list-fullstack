import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router";

export const Person = () => {
    const [person, setPerson] = useState({});
    let { uid } = useParams();

    const getPerson = (uid) => {
        fetch(`https://www.swapi.tech/api/people/${uid}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setPerson(response.result);
            });
    };

    useEffect(() => {
        getPerson(uid);
    }, []);

    return (
        <Container className="mt-5">
            {!isEmpty(person) && (
                <>
                    <Badge
                        className="py-3 px-3 bg-success border rounded"
                        style={{
                            width: "100%",
                        }}
                    >
                        <h1 className="mb-3 bg-success text-light d-flex align-items-center justify-content-start">
                            {person.properties.name}
                        </h1>
                    </Badge>
                    <Container>
                        <div>Gender: {person.properties.gender}</div>
                        <div>Hair color: {person.properties.hair_color}</div>
                        <div>Height: {person.properties.height}</div>
                        <div>Mass: {person.properties.mass}</div>
                    </Container>
                </>
            )
            }
        </Container>
    );
};