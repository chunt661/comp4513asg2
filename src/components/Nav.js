import { useState } from 'react';
import { Layout, Button } from 'antd';

import About from './About.js';

import './Nav.css';

const { Header } = Layout;

const Nav = (props) => {
    const [aboutVisible, setAboutVisible] = useState(false);
    
    const openModal = () => {
        setAboutVisible(true);
    };
    
    const closeModal = () => {
        setAboutVisible(false);
    }
    
    return (
        <Header>
            <span className='logo'>shakespea.re</span>
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