import { useState, createContext } from 'react';

export const PlaysContext = createContext();

const PlaysContextProvider = (props) => {
    const [plays, setPlays] = useState([]);
    
    return (
        <PlaysContext.Provider value={plays, setPlays}>
            {props.children}
        </PlaysContext.Provider>
    );
};

export default PlaysContextProvider;