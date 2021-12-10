import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Menu, Dropdown, Avatar } from 'antd';

import { UserOutlined } from '@ant-design/icons';

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
    
    /**
    Redirects the user to the logout page. Note that the logout button
    redirects to /logout rather than utilizing react-router-dom for the
    routing. This is because react-router-dom 'bypasses' Express' routing.
    */
    const handleLogout = () => { window.location.href = '/logout' };
    
    // Account dropdown menu
    const userMenu = (
        <Menu>
            <Link to='/account'>
                <Menu.Item key='1'>Account</Menu.Item>
            </Link>
            <Menu.Divider />
            <Menu.Item key='2' onClick={handleLogout} danger>Logout</Menu.Item>
        </Menu>
    );
    
    return (
        <Header>
            <Link
                className='logo'
                to='/'>
                shakespea.re
            </Link>
            <div>
                <Button type='text' onClick={openModal}>About</Button>
                { props.user && (
                    <Dropdown
                        overlay={userMenu}
                        trigger={['click', 'hover']}
                        placement='bottomCenter'>
                        <Button
                            id='user-btn'
                            type='text'>
                            <Avatar
                                src={props.user.picture.thumbnail}
                                size={20} />
                            <span>{props.user.details.firstname} {props.user.details.lastname}</span>
                        </Button>
                    </Dropdown>
                ) }
            </div>
            <About visible={aboutVisible} closeModal={closeModal} />
        </Header>
    );
};

export default Nav;