import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext({
    favorites: [],
    setFavorites: () => {},
    deleteFavorite: () => {},
    addFavorite: () => {},
});

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const getFavoritesList = () => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/favorites`)
            .then((res) => res.json())
            .then(data => setFavorites(data))
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

    const deleteFavorite = (id, type) => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/favorites`, {
            method: "DELETE",
            }).then(() => {
                getFavoritesList();
            });
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