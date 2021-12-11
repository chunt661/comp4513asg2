import { useContext } from 'react';
import { Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import { FavouritesContext } from './FavouritesContext.js';

import './FavouriteButton.css';

/**
Add to/remove from favourites button. Must be supplied a play object via props.
When this button is clicked, it will either add the play (if it is not
yet in favourites) or remove the play (if it is already in favourites) to the
user's favourites.
*/
const FavouriteButton = (props) => {
    const { favourites, addToFavourites, removeFromFavourites } = useContext(FavouritesContext);
    
    // Whether the play is in the user's favourites
    const favourited = favourites.filter(f => f.id === props.play.id).length > 0;
    
    // Icon is filled if the play is favourited, and hollow if it is not
    const Icon = favourited ? HeartFilled : HeartOutlined;
    const ghost = props.isWhite ? !favourited : favourited;
    
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
            className='favourite-btn'
            title={favourited ? 'Remove from favourites' : 'Add to favourites'}
            onClick={handleClick}
            type={favourited ? 'danger' : 'default' }
            shape='circle'
            icon={<Icon style={{
                        opacity: (favourited ? 1 : .66),
                        fontSize: (props.size === 'large' ? '20pt' : '14pt')
                    }} />}
            {...(ghost && {ghost: true})}
            />
    )
};

export default FavouriteButton;