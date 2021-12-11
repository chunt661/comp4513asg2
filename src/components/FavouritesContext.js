import { useState, createContext } from 'react';

/**
Context provider for user's favourites.
*/
const FavouritesContextProvider = (props) => {
    const [favourites, setFavourites] = useState([]);
    
    const addToFavourites = (play) => {
        if (!favourites.includes(play)) {
            const shallow = [...favourites];
            shallow.push(play);
            setFavourites(shallow);
        }
    };
    
    const removeFromFavourites = (play) => {
        const shallow = [...favourites];
        const index = shallow.findIndex(p => p.id === play.id);
        shallow.splice(index, 1);
        setFavourites(shallow);
    };
    
    return (
        <FavouritesContext.Provider value={{
                favourites: favourites,
                addToFavourites: addToFavourites,
                removeFromFavourites: removeFromFavourites
            }}>
            {props.children}
        </FavouritesContext.Provider>
    );
};

export const FavouritesContext = createContext();
export default FavouritesContextProvider;