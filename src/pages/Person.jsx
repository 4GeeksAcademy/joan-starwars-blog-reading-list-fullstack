import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router";

export const Person = () => {
    const [person, setPerson] = useState({});
    let { uid } = useParams();

    const getPerson = (uid) => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/people/${uid}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setPerson(response.content);
            });
    };

    useEffect(() => {
        getPerson(uid);
    }, []);

    return (
        <Container className="mt-2">
            {!isEmpty(person) && (
                <>
                    <Badge
                        className="py-3 px-3 bg-dark border rounded"
                        style={{
                            width: "100%",
                        }}
                    >
                        <h1 className="mb-3 bg-dark text-warning d-flex align-items-center justify-content-start">
                            {person.name}
                        </h1>
                    </Badge>
                    <Container>
                        <div><strong>Species: </strong>{person.species}</div>
                        <div><strong>Height: </strong>{person.height}</div>
                        <div><strong>Skin color: </strong>{person.skin_color}</div>
                        <div><strong>Hair color: </strong>{person.hair_color}</div>
                    </Container>
                </>
            )
            }
        </Container>
    );
};