import { useContext } from "react";
import { FavoritesContext } from "../context/Favorites";
import { isEmpty } from "lodash";
import { NavLink } from "react-router";
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router";


export const NavBar = () => {
    const { favorites, deleteFavorite } = useContext(FavoritesContext);

    const navigate = useNavigate();

    return (
        <Navbar sticky="top" bg="dark" data-bs-theme="dark" text="warning" expand="lg">
            <Container>
                <Navbar.Brand style={{ color: "#ffc107" }} onClick={() => navigate("/")}>Starwars Blog Reading List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!isEmpty(favorites) && (
                            <NavDropdown title="Favorites" id="basic-nav-dropdown">
                                {favorites.map((favorite) => {
                                    return (
                                        <div key={`${favorite.type}/${favorite.id}`}>
                                            <NavDropdown.Item>
                                                <NavLink style={{ color: "white" }} to={`${favorite.type}/${favorite.id}`}>
                                                    {favorite.name}
                                                </NavLink>
                                                <Badge
                                                    onClick={() => {
                                                        deleteFavorite(favorite.id, favorite.type);
                                                    }}

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