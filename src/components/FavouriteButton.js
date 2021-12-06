import { useContext } from 'react';
import { Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import { FavouritesContext } from './FavouritesContext.js';

import './FavouriteButton.css';

const FavouriteButton = (props) => {
    const { favourites, addToFavourites, removeFromFavourites } = useContext(FavouritesContext);
    
    const favourited = favourites.filter(f => f.id === props.play.id).length > 0;
    
    // Icon is filled if the play is favourited, and hollow if it is not
    const Icon = favourited ? HeartFilled : HeartOutlined;
    
    /**
    Adds or removes the play from favourites.
    */
    const handleClick = () => {
        if (favourited) {
            removeFromFavourites(props.play);
        } else {
            addToFavourites(props.play);
        }
    };
    
    return (
        <Button
            onClick={handleClick}
            className='favourite-btn'
            type={favourited ? 'danger' : 'default' }
            {...(favourited && {ghost: true})}
            shape='circle'
            icon={<Icon style={{
                        opacity: (favourited ? 1 : .66),
                        fontSize: (props.size == 'large' ? '20pt' : '14pt')
                    }} />}
            />
    )
};

export default FavouriteButton;