import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

import About from './About.js';

import './Nav.css';

const { Header } = Layout;

/**
The top nav bar.
*/
const Nav = (props) => {
    const [aboutVisible, setAboutVisible] = useState(false);
    
    const openModal = () => { setAboutVisible(true); };
    const closeModal = () => { setAboutVisible(false); }
    
    return (
        <Header>
            <Link
                className='logo'
                to='/'>
                shakespea.re
            </Link>
            <div>
                <Button type='text' onClick={openModal}>About</Button>
                <Button type='text'>Account</Button>
                <Button type='primary'>Log Out</Button>
            </div>
            <About visible={aboutVisible} closeModal={closeModal} />
        </Header>
    );
};

export default Nav;