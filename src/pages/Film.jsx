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
        <Container className="mt-2">
            {!isEmpty(movie) && (
                <>
                <Badge
                    className="py-3 px-3 bg-dark border rounded"
                    style={{
                        width: "100%",
                    }}
                >
                    <h1 className="mb-3 bg-dark text-warning d-flex align-items-center justify-content-start">
                        {movie.properties.title}
                    </h1>
                </Badge>
            <div>{movie.properties.opening_crawl}</div>
            <div><strong>Episode ID: </strong>{movie.properties.episode_id}</div>
            <div><strong>Director: </strong>{movie.properties.director}</div>
            <div><strong>Producer: </strong>{movie.properties.producer}</div>
            <div><strong>Release date: </strong>{movie.properties.release_date}</div>
            </>
            ) 
         }
        </Container>
    );
};