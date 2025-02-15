import { useContext } from "react";
import { FavoritesContext } from "../context/Favorites";
import { isEmpty } from "lodash";
import { NavLink } from "react-router";
import { Badge, Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";


export const NavBar = () => {
    const { favorites, deleteFavorite } = useContext(FavoritesContext);

    const navigate = useNavigate();

    return (
        <Navbar sticky="top" bg="dark" data-bs-theme="dark" text="warning" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => navigate("/")}>
                    <Button variant="black" style={{ color: "#ffc107", fontSize: "1.5rem" }}>Starwars Blog Reading List</Button>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!isEmpty(favorites) && (
                            <NavDropdown title="Favorites" id="basic-nav-dropdown">
                                {favorites.map((favorite) => {
                                    return (
                                        <div key={`${favorite.type}/${favorite.ID}`}>
                                            <NavDropdown.Item>
                                                <NavLink style={{ color: "#ffc107" }} to={`${favorite.type}/${favorite.external_ID}`}>
                                                    {favorite.name}
                                                </NavLink>
                                                <Badge bg="danger"
                                                    onClick={() => {
                                                        deleteFavorite(favorite.ID, favorite.type);
                                                    }}
                                                    style={{ marginLeft: "5px", color: "#212529"}}
                                                >X</Badge>
                                            </NavDropdown.Item>
                                        </div>
                                    )
                                })}
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};