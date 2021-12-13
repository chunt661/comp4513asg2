import { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { Layout, Input, Button } from 'antd';

import { SearchContext } from './SearchContext.js';

import './Home.css';

const { Content } = Layout;

/**
Home page content.
*/
const Home = (props) => {
    const { setQuery, clearFilters } = useContext(SearchContext);
    const history = useHistory();
    
    // Clears the filters whenever the user navigates to the homepage
    useEffect(() => { clearFilters() }, []);
    
    const handleSearch = (value) => {
        setQuery(value);
        history.push('/browse');
    };
    
    return (
        <Content id='home'>
            <div
                className='hero-image'
                style={{backgroundImage: "url('/hero.jpg')"}}>
            </div>
            <div className='splash'>
                <CSSTransitionGroup
                    transitionName='splash'
                    transitionAppear={true}
                    transitionAppearTimeout={800}>
                    <h1 className='logo'>shakespea.re</h1>
                    <p>A Shakespeare play browser. Close contenders for the name include "shakespearely" and "shakespr".</p>
                    <p>Search for a specific play, or browse through all of his most famous works.</p>
                    <Input.Search
                        className='search'
                        placeholder='Search...'
                        onSearch={handleSearch}
                        enterButton />
                    <div className='button-container'>
                        <Link to='/browse'>
                            <Button type='primary' size='large'>Browse All</Button>
                        </Link>
                    </div>
                </CSSTransitionGroup>
            </div>
            <span id='hero-image-credit'>
                Hero image from:&nbsp;
                <a href='https://unsplash.com/photos/62vi3TG5EDg'>
                    https://unsplash.com/photos/62vi3TG5EDg
                </a>
            </span>
        </Content>
    );
};

export default Home;