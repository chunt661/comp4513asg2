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
    
    // Account dropdown menu
    const userMenu = (
        <Menu>
            <Menu.Item key='1'>Account</Menu.Item>
            <Menu.Divider />
            <Link to='/logout'>
                <Menu.Item key='2' danger>Logout</Menu.Item>
            </Link>
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