import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router";

export const Specie = () => {
    const [breed, setBreed] = useState({});
    let { id } = useParams();

    const getBreed = (id) => {
        fetch(`https://www.swapi.tech/api/species/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setBreed(response.result);
            });
    };

    useEffect(() => {
        getBreed(id);
    }, []);

    return (
        <Container className="mt-2">
            {!isEmpty(breed) && (
                <>
                    <Badge
                        className="py-3 px-3 bg-dark border rounded"
                        style={{
                            width: "100%",
                        }}
                    >
                        <h1 className="mb-3 bg-dark text-warning d-flex align-items-center justify-content-start">
                            {breed.properties.name}
                        </h1>
                    </Badge>
                    <Container>
                        <div><strong>Classification: </strong>{breed.properties.classification}</div> 
                        <div><strong>Language: </strong>{breed.properties.language}</div>                        
                        <div><strong>Skin colors: </strong>{breed.properties.skin_colors}</div>
                        <div><strong>Hair colors: </strong>{breed.properties.hair_colors}</div>
                        <div><strong>Eye colors: </strong>{breed.properties.eye_colors}</div>
                        <div><strong>Average height: </strong>{breed.properties.average_height}</div>
                        <div><strong>Average lifespan: </strong>{breed.properties.average_lifespan}</div>
                    </Container>
                </>
            )
            }
        </Container>
    );
};