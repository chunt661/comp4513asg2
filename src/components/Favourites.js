import { useState, useContext } from 'react';
import { Layout, Badge, Button } from 'antd';
import { HeartOutlined, LeftCircleOutlined,
        RightCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { CSSTransitionGroup } from 'react-transition-group';

import { FavouritesContext } from './FavouritesContext.js';

import './Favourites.css';

const { Sider } = Layout;

/**
The favourites sidebar. Displays a list of the user's favourites. Can be
collapsed and expanded.
*/
const Favourites = (props) => {
    const { favourites } = useContext(FavouritesContext);
    
    const [collapsed, setCollapsed] = useState(!props.visible); // Initial visibility is determined by props
    const handleCollapse = (e) => { setCollapsed(!collapsed) };
    const CollapseIcon = collapsed ? RightCircleOutlined : LeftCircleOutlined;
    
    return (
        <Sider
            className='favourites'
            collapsed={collapsed}
            reverseArrow={false}
            width={280}
            >
            <div className='favourites-icon' onClick={handleCollapse}>
                <CSSTransitionGroup
                        transitionName='title-grow'
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                        {!collapsed && <h2>Favourites</h2>}
                    </CSSTransitionGroup>
                <Badge
                    count={collapsed ? favourites.length : 0}
                    size='small'
                    offset={[-2, 20]}
                    dynamic='true'>
                    <HeartOutlined style={{
                                fontSize: '24px',
                                color: 'var(--primary-color)'
                        }} />
                </Badge>
                <CollapseIcon className='collapse-btn'
                    style={{
                        color: 'var(--text-color-secondary)'
                    }}/>
            </div>
            { !collapsed &&
                (<ul>
                    <CSSTransitionGroup
                        transitionName='empty-slide'
                        transitionEnterTimeout={600}
                        transitionLeaveTimeout={1}>
                        {
                        favourites.length === 0 &&
                            <li className='empty'>No favourites yet</li>
                        }
                    </CSSTransitionGroup>
                    <CSSTransitionGroup
                            transitionName='favourite-slide'
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={600}>
                        { favourites.map(f => (
                            <FavouritesItem key={f.id} play={f} />
                        ))}
                    </CSSTransitionGroup>
                </ul>)
            }
        </Sider>
    );
};

/**
Individual item in the favourites list. Has an button that allows the user to
remove the item from their favourites.
*/
const FavouritesItem = (props) => {
    const { removeFromFavourites } = useContext(FavouritesContext);
    
    const handleDelete = () => { removeFromFavourites(props.play) };
    
    return (
        <div className='fav-container'>
        <li>
            <span>{props.play.title}</span>
            <Button
                onClick={handleDelete}
                size="small"
                shape="circle"
                type="ghost"
                icon={<CloseOutlined />} />
        </li>
        </div>
    );
};

export default Favourites;