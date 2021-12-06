import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { BookFilled } from '@ant-design/icons';

import FavouriteButton from './FavouriteButton.js';

import './PlayItem.css';

/**
An individual search result item.
*/
const PlayItem = (props) => {
    const href = '/play/' + props.play.id;
    
    return (
        <li className='result'>
            <div>
                <Link className='title' to={href}>{props.play.title}</Link>
                <span className='year'>{props.play.likelyDate}</span>
            </div>
            <FavouriteButton play={props.play} />
            <p>{props.play.synopsis}</p>
            <div>
                <span className='genre'>{props.play.genre}</span>
                {props.play.filename && (
                    <span className='available'>
                        <BookFilled />&nbsp;Text available
                    </span>
                )}
            </div>
            <Link to={href}>
                <Button type='primary'>View</Button>
            </Link>
        </li>
    );
};

export default PlayItem;