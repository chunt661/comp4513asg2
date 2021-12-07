import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Input, Checkbox, Select, Button, Row, Col } from 'antd';
import { FilterFilled, FilterOutlined } from '@ant-design/icons';
import { Collapse } from 'react-collapse';

import './Filters.css';

const { Option } = Select;

/**
Filter panel. Holds the search filter options and buttons.
*/
const Filters = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    
    const [query, setQuery] = useState(''); // Initial value is retrieved from props
    const [yearBefore, setYearBefore] = useState('');
    const [yearAfter, setYearAfter] = useState('');
    const [genres, setGenres] = useState([]);
    
    const yearARef = useRef(null);
    const yearBRef = useRef(null);
    
    /*
    This is basically a flag that tells the components whether they should
    clear their inputs. Essentially the opposite of a dirty flag.
    
    See the comment in the YearInput component below for more explanation.
    */
    const [shouldClear, setShouldClear] = useState(false);
    
    /**
    Applies the given filters to the search results. The filter values are the
    appropriate state values by default, but can be modified if state is
    unreliable (e.g. when setting state and then immediately applying
    filters)
    */
    const applyFilters = (before=yearBefore, after=yearAfter, g=genres) => {
        props.applyFilters(query,
                           before !== '' ? before : 2000,
                           after !== '' ? after : 0,
                           g);
    };
    
    /**
    Called whenever the user types into the search bar.
    */
    const handleQuery = (e) => {
        setQuery(e.target.value);
        setShouldClear(false);
    };
    
    /**
    Updates the 'before year' state value. Called whenever relevant input is
    received. If the 'before' checkbox is unchecked, the state will be set to
    blank instead of what has been inputted.
    */
    const handleYearBefore = (checked, year) => {
        setYearBefore(checked ? year : '');
        setShouldClear(false);
    };
    
    /**
    Updates the 'after year' state value. Called whenever relevant input is
    received. If the 'after' checkbox is unchecked, the state will be set to
    blank instead of what has been inputted.
    */
    const handleYearAfter = (checked, year) => {
        setYearAfter(checked ? year : '');
        setShouldClear(false);
    };
    
    /**
    Updates the genre state. Called whenever a new genre is selected.
    */
    const handleGenre = (v) => {
        setGenres(v);
        setShouldClear(false);
    };
    
    /**
    Clears all inputs and resets the search filters. Called when the
    'clear filters' button is clicked
    */
    const handleClear = () => {
        setQuery('');
        setGenres([]);
        yearARef.current.clearInput();
        yearBRef.current.clearInput();
        
        applyFilters('', '', []);
    };
    
    const handleApply = () => { applyFilters() };
    
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
                    onChange={handleQuery}
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
                        shouldClear={shouldClear}
                        ref={yearBRef} />
                    <YearInput
                        name='After'
                        onChange={handleYearAfter}
                        shouldClear={shouldClear}
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
    const [active, setActive] = useState(false);
    const [year, setYear] = useState('');
    
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
                        value={year} />
                </Col>
            </Row>
        </Input.Group>
    );
});

export default Filters;