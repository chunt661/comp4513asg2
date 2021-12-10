import { useState, createContext } from 'react';

const SearchContextProvider = (props) => {
    const [query, setQuery] = useState([]);
    
    const updateQuery = (value) => {
        setQuery(value.trim().toLowerCase());
    };
    
    return (
        <SearchContext.Provider value={{
                query: query,
                setQuery: updateQuery
            }}>
            {props.children}
        </SearchContext.Provider>
    );
};

export const SearchContext = createContext();
export default SearchContextProvider;