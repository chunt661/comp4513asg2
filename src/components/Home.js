import { Link } from 'react-router-dom';
import { Layout, Input, Button } from 'antd';

import './Home.css';

const { Content } = Layout;

const Home = (props) => {
    return (
        <Content id='home'>
            <div
                className='hero-image'
                style={{backgroundImage: "url('/hero.jpg')"}}>
            </div>
            <div className='splash'>
                <div>
                    <h1 className='logo'>shakespea.re</h1>
                    <p>A Shakespeare play browser. Close contenders for the name include "shakespearely" and "shakespr".</p>
                    <p>Search for a specific play, or browse through all of his most famous works.</p>
                    <Input.Search
                        className='search'
                        placeholder='Search...'
                        enterButton />
                    <div className='button-container'>
                        <Link to='/browse'>
                            <Button type='primary' size='large'>Browse All</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Content>
    );
};

export default Home;