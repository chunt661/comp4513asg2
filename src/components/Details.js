import { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Layout, Tabs, Row, Col, List, Button, Popover, Skeleton } from 'antd';
import { CloseCircleFilled, InfoCircleOutlined } from '@ant-design/icons';

import FavouriteButton from './FavouriteButton.js';
import PlayViewer from './PlayViewer.js';
import LoadingSpinner from './LoadingSpinner.js';

import './Details.css';

const { Content } = Layout;
const { TabPane } = Tabs;

/**
Play details view. The ID of the play to display is retrieved from the URL
parameters, then loaded from either the API or local storage.
*/
const Details = (props) => {
    const [ play, setPlay ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams(); // URL parameter
    
    // Load play data
    useEffect( () => {
        const getData = async () => {
            let data = JSON.parse(localStorage.getItem(id));
            if (!data) {
                try {
                    const url = '/api/play/' + id;
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            setPlay(data[0]);
                            localStorage.setItem(id, JSON.stringify(data[0]))
                            setLoading(false);
                        });
                } catch (err) {
                    console.error(err);
                    setLoading(false);
                }
            } else {
                setPlay(data);
                setLoading(false);
            }
        };
        
        getData();
    }, [id]);
    
    const yearInfo = (
        <div>
            The likely year that this play was produced.
        </div>
    );
    
    return (
        <Content id='details'>
            { !loading
            ? // Content when data is loaded
            <div className='title-container'>
                <div>
                    <span>
                        <h1>{play.title}</h1>
                        <FavouriteButton play={play} size='large' isWhite={true} />
                    </span>
                    <Button
                        shape='circle'
                        icon={<CloseCircleFilled style={{ fontSize: '20pt' }} />}
                        onClick={() => { props.history.goBack() }}
                        ghost />
                </div>
                <p>{play.synopsis}</p>
            </div>
            : // Content if currently loading
            <div className='title-container'>
                <Skeleton active />
            </div>
            }
            <div className='content'>
                <Tabs type='card' defaultActiveKey='1'>
                    <TabPane tab='Details' key='1'>
                        { !loading
                        ? // Content when data is loaded
                        <Row gutter={32}>
                            <Col span={18}>
                                <h3>Description</h3>
                                <p>{play.desc}</p>
                            </Col>
                            <Col span={6}>
                                <h3>Details</h3>
                                <dl>
                                    <dt>
                                        Year&nbsp;<Popover content={yearInfo}>
                                            <InfoCircleOutlined  style={{ fontSize: '9pt' }} />
                                        </Popover>
                                    </dt>
                                    <dd>{play.likelyDate}</dd>
                                    <dt>Genre</dt>
                                    <dd>{play.genre}</dd>
                                </dl>
                                <h3>Links</h3>
                                <ul>
                                    <li><a href={play.wiki}>Wikipedia</a></li>
                                    <li><a href={play.gutenberg}>Project Gutenberg</a></li>
                                    <li><a href={play.shakespeareOrg}>Shakespeare.org</a></li>
                                </ul>
                            </Col>
                        </Row>
                        : // Content if currently loading
                        <Skeleton active />
                        }
                    </TabPane>
                    <TabPane
                        tab='Characters'
                        key='2'
                        className='characters-tab'
                        {...(!play.filename && {disabled: true})}>
                        {
                            play.playText &&
                                <List
                                    itemLayout='horizontal'
                                    dataSource={play.playText.persona}
                                    renderItem={player => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={player.player}
                                                description={player.desc} />
                                        </List.Item>
                                    )}
                                    />
                        }
                    </TabPane>
                    <TabPane
                        tab='Text'
                        key='3'
                        {...(!play.filename && {disabled: true})}>
                        { play.playText && <PlayViewer title={play.playText.title} acts={play.playText.acts} /> }
                    </TabPane>
                </Tabs>
                <div className='shadow-line'></div>
            </div>
        </Content>
    );
};

// The withRouter wrapper allows useHistory to be used despite the fact that
// this component is nested several nodes deep under the Route component
export default withRouter(Details);