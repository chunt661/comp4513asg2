import { useState, useRef, useContext,
        forwardRef, useImperativeHandle } from 'react';
import { Input, Checkbox, Select, Button, Row, Col } from 'antd';
import { FilterFilled, FilterOutlined } from '@ant-design/icons';
import { Collapse } from 'react-collapse';

import { SearchContext } from './SearchContext.js';

import './Filters.css';

const { Option } = Select;

/**
Filter panel. Holds the search filter options and buttons.
This became pretty messy towards the end of the project and is a good candidate
to be reworked.
*/
const Filters = (props) => {
    const { setQuery, filters, clearFilters } = useContext(SearchContext);
    
    const [collapsed, setCollapsed] = useState(false);
    
    // Initial value is retrieved from props
    const [query, setQueryText] = useState(props.defaultQuery);
    const [yearBefore, setYearBefore] = useState(props.defaultFilters.yearBefore);
    const [yearAfter, setYearAfter] = useState(props.defaultFilters.yearAfter);
    const [genres, setGenres] = useState([]);
    
    // References to the year inputs for clearing
    const yearARef = useRef(null);
    const yearBRef = useRef(null);
    
    /**
    Applies the given filters to the search results. The filter values are the
    appropriate state values by default, but can be modified if state is
    unreliable (e.g. when setting state and then immediately applying
    filters)
    */
    const applyFilters = (before=yearBefore, after=yearAfter, g=genres) => {
        setQuery(query);
        filters.setYearBefore(before);
        filters.setYearAfter(after);
        filters.setGenres(genres);
    };
    
    /**
    Updates the 'before year' state value. Called whenever relevant input is
    received. If the 'before' checkbox is unchecked, the state will be set to
    blank instead of what has been inputted.
    */
    const handleYearBefore = (checked, year) => {
        setYearBefore(checked ? year : '');
    };
    
    /**
    Updates the 'after year' state value. Called whenever relevant input is
    received. If the 'after' checkbox is unchecked, the state will be set to
    blank instead of what has been inputted.
    */
    const handleYearAfter = (checked, year) => {
        setYearAfter(checked ? year : '');
    };
    
    /**
    Clears all inputs and resets the search filters. Called when the
    'clear filters' button is clicked
    */
    const handleClear = () => {
        setQueryText('');
        setGenres([]);
        yearARef.current.clearInput();
        yearBRef.current.clearInput();
        
        clearFilters();
    };
    
    const handleApply = () => { applyFilters() };
    const handleSearchInput = (e) => { setQueryText(e.target.value); };
    const handleGenre = (v) => { setGenres(v); };
    const toggleCollapse = () => { setCollapsed(!collapsed) };
    
    const FilterIcon = collapsed ? FilterFilled : FilterOutlined;
    
    return (
        <div>
            <div className='search-container'>
                <Input.Search
                    className='search'
                    placeholder='Search...'
                    value={query}
                    enterButton
                    onChange={handleSearchInput}
                    onSearch={handleApply} />
                <Button
                    className='toggle-btn'
                    icon={<FilterIcon />}
                    onClick={toggleCollapse}>
                    { (collapsed ? 'Show' : 'Hide') + ' Filters'}
                </Button>
            </div>
            <Collapse isOpened={!collapsed}>
            <div className='filters'>
                <fieldset>
                    <legend>Year</legend>
                    <YearInput
                        name='Before'
                        onChange={handleYearBefore}
                        applyFilters={applyFilters}
                        value={yearBefore}
                        ref={yearBRef} />
                    <YearInput
                        name='After'
                        onChange={handleYearAfter}
                        applyFilters={applyFilters}
                        value={yearAfter}
                        ref={yearARef} />
                </fieldset>
                <fieldset>
                    <legend>Genre</legend>
                    <Select
                        onChange={handleGenre}
                        value={genres}
                        mode='multiple'
                        placeholder='Genre'
                        style={{width: '256px'}}
                        showSearch={false}
                        showArrow
                        allowClear>
                        <Option value='comedy'>Comedy</Option>
                        <Option value='tragedy'>Tragedy</Option>
                        <Option value='history'>History</Option>
                    </Select>
                </fieldset>
                <fieldset className='button-container'>
                    <Button onClick={handleClear}>Clear</Button>
                    <Button onClick={handleApply} type='primary'>Apply</Button>
                </fieldset>
            </div>
            </Collapse>
        </div>
    );
};

/**
A checkbox and text field for entering year values.
*/
const YearInput = forwardRef((props, ref) => {
    // Initial value determined by props
    const [active, setActive] = useState(props.value !== '');
    const [year, setYear] = useState(props.value);
    
    useImperativeHandle(ref, () => ({
        clearInput() {
            setYear('');
            setActive(false);
            props.onChange(false, '');
        }
    }));
    
    /**
    Sets the checkbox status. Called whenever the checkbox is modified.
    */
    const handleCheck = (e) => {
        const checked = e.target.checked;
        setActive(checked);
        props.onChange(checked, year);
    };
    
    /**
    Updates state values according to the input entered in the box. Called
    whenever input is received. If the input is not empty, the checkbox will
    be set to checked. Otherwise, the checkbox is set to unchecked.
    */
    const handleInput = (e) => {
        const val = e.target.value;
        const checked = val !== '';
        
        setYear(val);
        setActive(checked);
        props.onChange(checked, val);
    };
    
    /**
    Applies the filters when the enter key is pressed.
    */
    const handleSubmit = (e) => {
        props.applyFilters();
    }
    
    return (
        <Input.Group className='year-input'>
            <Row>
                <Col>
                    <Checkbox
                        className='checkbox'
                        checked={active}
                        onChange={handleCheck}
                        tabIndex={-1}>
                        {props.name}
                    </Checkbox>
                </Col>
                <Col>
                    <Input
                        size='small'
                        onChange={handleInput}
                        value={year}
                        onPressEnter={handleSubmit} />
                </Col>
            </Row>
        </Input.Group>
    );
});

export default Filters;