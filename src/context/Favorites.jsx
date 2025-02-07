import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext({
    favorites: [],
    deleteFavorite: (id, type) => { },
    addFavorite: (id, name, type) => { },
});

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const deleteFavorite = (id, type) => {
        setFavorites(
            favorites.filter((favorite) => {
                return !(favorite.id === id && favorite.type === type);
            })
        )
    }

    const addFavorite = (id, name, type) => {
     fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/favorites`, {
        method: "POST",
        headers: {"content-Type":"application/json"},
        body: JSON.stringify({
            "external_ID":id,
            "name":name,
            "type":type
        })
        })
        .then(() => {
            return getFavoritesList();
        })


    };



    const getFavoritesList = () => {
        fetch(`https://potential-winner-595qpgw6j743p69x-3000.app.github.dev/favorites`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                setFavorites(response.content);
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