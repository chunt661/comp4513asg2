import { Button } from 'antd';
import { HeartFilled, HeartOutlined, BookFilled } from '@ant-design/icons';

import './PlayItem.css';

const PlayItem = (props) => {
    const FavouriteIcon = props.favourited ? HeartFilled : HeartOutlined;
    
    /*
    Adds or removes the play from the favourites when the heart button is
    clicked.
    */
    const handleFavourite = () => {
        props.updateFavourites(props.play);
    };
    
    return (
        <li className='result'>
            <div>
                <span className='title'>{props.play.title}</span>
                <span className='year'>{props.play.likelyDate}</span>
            </div>
            <Button
                onClick={handleFavourite}
                className='favourite-btn'
                type={props.favourited ? 'danger' : 'default' }
                {...(props.favourited && {ghost: true})}
                shape='circle'
                icon={<FavouriteIcon style={{
                            opacity: (props.favourited ? 1 : .66),
                            fontSize: '14pt'
                        }} />}
                />
            <p>{props.play.synopsis}</p>
            <div>
                <span className='genre'>{props.play.genre}</span>
                {props.play.filename && (
                    <span className='available'>
                        <BookFilled />&nbsp;Text available
                    </span>
                )}
            </div>
            <Button type='primary'>View</Button>
        </li>
    );
};

export default PlayItem;