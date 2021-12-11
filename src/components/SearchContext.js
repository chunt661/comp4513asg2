import { useState, createContext } from 'react';

/**
Provides state for search query and filters.
*/
const SearchContextProvider = (props) => {
    const [query, setQuery] = useState('');
    const [yearBefore, setYearBefore] = useState('');
    const [yearAfter, setYearAfter] = useState('');
    const [genres, setGenres] = useState([]);
    
    const updateQuery = (value) => {
        const q = value ? value : '';
        setQuery(q.trim().toLowerCase());
    };
    
    const updateYearBefore = (value) => {
        setYearBefore(value ? value : '');
    };
    
    const updateYearAfter = (value) => {
        setYearAfter(value ? value : '');
    };
    
    /**
    Clears the query and all filters.
    */
    const reset = () => {
        setQuery('');
        setYearBefore('');
        setYearAfter('');
        setGenres([]);
    };
    
    return (
        <SearchContext.Provider value={{
                query: query,
                setQuery: updateQuery,
                filters: {
                    yearBefore: yearBefore,
                    setYearBefore: updateYearBefore,
                    yearAfter: yearAfter,
                    setYearAfter: updateYearAfter,
                    genres: genres,
                    setGenres: setGenres
                },
                clearFilters: reset
            }}>
            {props.children}
        </SearchContext.Provider>
    );
};

export const SearchContext = createContext();
export default SearchContextProvider;