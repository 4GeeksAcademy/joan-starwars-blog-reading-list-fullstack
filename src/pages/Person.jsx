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
                        className="py-3 px-3 bg-dark border rounded"
                        style={{
                            width: "100%",
                        }}
                    >
                        <h1 className="mb-3 bg-dark text-warning d-flex align-items-center justify-content-start">
                            {person.properties.name}
                        </h1>
                    </Badge>
                    <Container>
                        <div><strong>Gender: </strong>{person.properties.gender}</div> 
                        <div><strong>Height: </strong>{person.properties.height}</div>
                        <div><strong>Mass: </strong>{person.properties.mass}</div>
                        <div><strong>Skin color: </strong>{person.properties.skin_color}</div>
                        <div><strong>Hair color: </strong>{person.properties.hair_color}</div>
                        <div><strong>Eye color: </strong>{person.properties.eye_color}</div>
                        <div><strong>Birth year: </strong>{person.properties.birth_year}</div>
                    </Container>
                </>
            )
            }
        </Container>
    );
};