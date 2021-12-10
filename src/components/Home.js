import { Layout, Input } from 'antd';

import './Home.css';

const { Content } = Layout;

const Home = (props) => {
    return (
        <Content id='home'>
            <div
                className='hero-image'
                style={{backgroundImage: "url('/shakespeare.jpg')"}}>
            </div>
            <div className='splash'>
                <div>
                    <h1 className='logo'>shakespea.re</h1>
                    <p>A Shakespeare play browser. Close contenders for the name include "shakespearely" and "shakespr".</p>
                    <p>Search for a specific play, or browse through his most famous works.</p>
                    <Input.Search
                        className='search'
                        placeholder='Search...' />
                </div>
            </div>
        </Content>
    );
};

export default Home;