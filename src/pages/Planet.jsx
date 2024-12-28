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
        <Container className="mt-5">
            {!isEmpty(star) && (
                <>
                    <Badge
                        className="py-3 px-3 bg-success border rounded"
                        style={{
                            width: "100%",
                        }}
                    >
                        <h1 className="mb-3 bg-success text-light d-flex align-items-center justify-content-start">
                            {star.properties.name}
                        </h1>
                    </Badge>
                    <Container>
                        <div>Diameter: {star.properties.diameter}</div>
                        <div>Gravity: {star.properties.gravity}</div>
                        <div>Climate: {star.properties.climate}</div>
                        <div>Terrain: {star.properties.terrain}</div>
                        <div>Population: {star.properties.population}</div>

                    </Container>
                </>
            )
            }
        </Container>
    );
};