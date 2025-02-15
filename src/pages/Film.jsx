import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router";

export const Film = () => {
    const [movie, setMovie] = useState({});
    let { id } = useParams();

    const getMovie = (id) => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/films/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setMovie(response.content);
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
                        {movie.title}
                    </h1>
                </Badge>
            <div><strong>Episode ID: </strong>{movie.episode_id}</div>
            <div><strong>Director: </strong>{movie.director}</div>
            <div><strong>Producer: </strong>{movie.producer}</div>
            <div><strong>Release date: </strong>{movie.release_date}</div>
            </>
            ) 
         }
        </Container>
    );
};