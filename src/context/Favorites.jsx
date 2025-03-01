import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext({
    favorites: [],
    setFavorites: (id, name, type) => {},
    deleteFavorite: (id) => {},
    addFavorite: (id, name, type) => {},
});

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const getFavoritesList = () => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/favorites`)
            .then((res) => res.json())
            .then(data => setFavorites(data))
    };

    const deleteFavorite = (id) => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/favorites/${id}`, {
            method: "DELETE",
            headers: { "content-Type": "application/json" },
            }).then(() => {
                return getFavoritesList();
            });
    };

    const addFavorite = (id, name, type) => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/favorites`, {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
                "external_ID": id,
                "name": name,
                "type": type
            })
        })
            .then(() => {
                return getFavoritesList();
            })
    };

    useEffect(() => {
        getFavoritesList();
    }, []);

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, deleteFavorite, getFavoritesList }}
        >
            {children}
        </FavoritesContext.Provider>
    );

};