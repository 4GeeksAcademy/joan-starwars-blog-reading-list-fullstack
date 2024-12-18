import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router";

export const Film = () => {
    const [movie, setMovie] = useState({});
    let { id } = useParams();

    const getMovie = (id) => {
        fetch(`https://www.swapi.tech/api/films/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setMovie(response.result);
            });
    };

    useEffect(() => {
        getMovie(id);
    }, []);

    return (
        <Container className="mt-5">
            {!isEmpty(movie) && (
                <>
                <Badge
                    className="py-3 px-3 bg-success border rounded"
                    style={{
                        width: "100%",
                    }}
                >
                    <h1 className="mb-3 bg-success text-light d-flex align-items-center justify-content-start">
                        {movie.properties.title}
                    </h1>
                </Badge>
            {movie.properties.opening_crawl}
            </>
            ) 
         }
        </Container>
    );
};