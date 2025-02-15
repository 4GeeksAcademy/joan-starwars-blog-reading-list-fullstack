import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router";

export const Planet = () => {
    const [star, setStar] = useState({});
    let { id } = useParams();

    const getStar = (id) => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/planets/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setStar(response.content);
            });
    };

    useEffect(() => {
        getStar(id);
    }, []);

    return (
        <Container className="mt-2">
            {!isEmpty(star) && (
                <>
                    <Badge
                        className="py-3 px-3 bg-dark border rounded"
                        style={{
                            width: "100%",
                        }}
                    >
                        <h1 className="mb-3 bg-dark text-warning d-flex align-items-center justify-content-start">
                            {star.name}
                        </h1>
                    </Badge>
                    <Container>
                        <div><strong>Diameter: </strong>{star.diameter}</div>
                        <div><strong>Gravity: </strong>{star.gravity}</div>
                        <div><strong>Climate: </strong>{star.climate}</div>
                        <div><strong>Population: </strong>{star.population}</div>
                    </Container>
                </>
            )
            }
        </Container>
    );
};