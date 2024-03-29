import { useState, useRef, useEffect, useContext } from 'react';
import { Layout, Divider } from 'antd';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

import PlayItem from './PlayItem.js';
import Filters from './Filters.js';
import LoadingSpinner from './LoadingSpinner.js';
import { SearchContext } from './SearchContext.js';

import './Browse.css';

const { Content } = Layout;

// The default sort direction (ascending)
const defaultSortDirection = -1;

/**
Search results view.
*/
const Browse = (props) => {
    const { query, filters } = useContext(SearchContext);
    
    // Original dataset
    const playData = useRef([]);
    
    // Filtered + sorted dataset
    const [plays, setPlays] = useState([]);
    
    const [loading, setLoading] = useState(true);
    
    // Holds the last sort configuration. Used to ensure the data is still
    // sorted after applying filters.
    const [sortConfig, setSortConfig] = useState({
        field: 'title',
        direction: defaultSortDirection
    });
    
    // Load data
    useEffect( () => {
        const getData = async () => {
            let data = JSON.parse(localStorage.getItem('plays'));
            if (!data) {
                try {
                    const url = '/api/list';
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            playData.current = sortPlays(data); // plays is also set when sorted
                            localStorage.setItem('plays', JSON.stringify(playData.current));
                            applyFilters(query, 2000, 0, []);
                            setLoading(false);
                        });
                } catch (err) {
                    console.error(err);
                    setLoading(false);
                }
            } else {
                playData.current = data;
                setPlays(data);
                applyFilters(query, 2000, 0, []);
                setLoading(false);
            }
        };
        getData();
    }, []);
    
    /**
    Updates the stored sort configuration and then uses the new values to sort
    the plays.
    */
    const updateSortConfig = (field, direction) => {
        setSortConfig({
            field: field,
            direction: direction
        });
        
        sortPlays(plays, field, direction);
    };
    
    /**
    Sorts a list of plays by the given criteria. The stored sort configuration
    is used by default.
    The sorted list is stored in state and is returned.
    */
    const sortPlays = (data=plays,
                       field=sortConfig.field,
                       direction=sortConfig.direction) => {
        
        const sorted = [...data].sort((a,b) => b[field]
              .localeCompare(a[field]) * direction);
        
        setPlays(sorted);
        return sorted;
    };
    
    /**
    Filters the original dataset by the given criteria. The filtered list is
    also stored in state.
    */
    const applyFilters = (q, yearBefore, yearAfter, genres) => {
        const filtered = [...playData.current]
                // By title
                .filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
                // By year
                .filter(p => parseInt(p.likelyDate) < yearBefore && parseInt(p.likelyDate) > yearAfter)
                // By genres
                .filter(p => genres.includes(p.genre) || genres.length === 0);
        const sorted = sortPlays(filtered);
        setPlays(sorted);
    };
    
    // Applies filter whenever filter values change.
    useEffect(() => {
        applyFilters(query,
                       filters.yearBefore !== '' ? filters.yearBefore : 2000,
                       filters.yearAfter !== '' ? filters.yearAfter : 0,
                       filters.genres);
    }, [query, filters]);
    
    return (
        <Content id='browse'>
            <Filters
                defaultQuery={query}
                defaultFilters={filters} />
            <Divider style={{margin: '.675rem 0'}} />
            <div className='results-header'>
                <h2>Search Results</h2>
                    <div className='sort-container'>
                        <span>Sort by:</span>
                        <SortButton
                            field='title'
                            name='Title'
                            updateSort={updateSortConfig}
                            sortConfig={sortConfig} />
                        <SortButton
                            field='likelyDate'
                            name='Year'
                            updateSort={updateSortConfig}
                            sortConfig={sortConfig} />
                    </div>
            </div>
            { loading ? <LoadingSpinner /> // Display spinner if loading
            : // Display search results if data is loaded
            <ul className='results'>
                { plays.length === 0 && (
                    <li className='result'>No plays were found.</li>
                )}
                { plays.map(p => {
                    return (
                        <PlayItem
                            key={p.id}
                            play={p} />
                    );
                })}
            </ul>
            }
        </Content>
    );
};

/**
A button for a sortable field. When clicked, it updates the parent's sort
configuration. An arrow displays the current sort direction.
*/
const SortButton = (props) => {
    const defaultDirection = defaultSortDirection;
    const isActive = props.sortConfig.field == props.field;
    
    /**
    Updates the sort direction when this button is clicked.
    */
    const handleClick = () => {
        const direction = isActive ? props.sortConfig.direction*-1 : defaultDirection;
        props.updateSort(props.field, direction);
    };
    
    // Helper variables for current sort direction
    const upActive = isActive && props.sortConfig.direction === -1;
    const downActive = isActive && props.sortConfig.direction === 1;
    
    return (
        <span className='sort-button' onClick={handleClick}>
            <span>{props.name}</span>
            <span className='sort-arrows'>
                <CaretUpFilled style={{
                        fontSize: '8px',
                        color: upActive ? 'var(--text-color)' : 'var(--text-color-secondary)'
                    }} />
                <CaretDownFilled style={{
                        fontSize: '8px',
                        color: downActive ? 'var(--text-color)' : 'var(--text-color-secondary)'
                    }} />
            </span>
        </span>
    );
};

export default Browse;