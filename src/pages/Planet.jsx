import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router";

export const Planet = () => {
    const [star, setStar] = useState({});
    let { id } = useParams();

    const getStar = (id) => {
        fetch(`https://www.swapi.tech/api/planets/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setStar(response.result);
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
                            {star.properties.name}
                        </h1>
                    </Badge>
                    <Container>
                        <div><strong>Diameter: </strong>{star.properties.diameter}</div>
                        <div><strong>Gravity: </strong>{star.properties.gravity}</div>
                        <div><strong>Orbital period: </strong>{star.properties.orbital_period}</div>
                        <div><strong>Rotation period: </strong>{star.properties.rotation_period}</div>
                        <div><strong>Climate: </strong>{star.properties.climate}</div>
                        <div><strong>Terrain: </strong>{star.properties.terrain}</div>
                        <div><strong>Population: </strong>{star.properties.population}</div>
                    </Container>
                </>
            )
            }
        </Container>
    );
};