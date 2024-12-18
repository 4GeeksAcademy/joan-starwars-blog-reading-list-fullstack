import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { NavLink } from "react-router";

export const Films = () => {
    const [movies, setMovies] = useState([]);
    const getMoviesList = () => {
        fetch(`https://www.swapi.tech/api/films`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setMovies(response.result);
            });
    };

    useEffect(() => {
        getMoviesList();
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
                    Films List
                </h1>
            </Badge>
            {!isEmpty(movies) && movies.map((element) => (
                <NavLink to={`/film/${element.uid}`} end>


                    <Container
                        className="d-flex align-items-center"
                        key={element.uid}
                    >
                        <Container className="text-light mt-1 py-2 bg-success border rounded">
                            {element.properties.title || "Sin etiqueta"}
                        </Container>
                    </Container>
                </NavLink>
            ))}
        </Container>
    );
};