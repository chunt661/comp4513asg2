import { Button } from 'antd';
import { HeartFilled, HeartOutlined, BookFilled } from '@ant-design/icons';

import FavouriteButton from './FavouriteButton.js';

import './PlayItem.css';

const PlayItem = (props) => {
    return (
        <li className='result'>
            <div>
                <span className='title'>{props.play.title}</span>
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
            <Button type='primary'>View</Button>
        </li>
    );
};

export default PlayItem;