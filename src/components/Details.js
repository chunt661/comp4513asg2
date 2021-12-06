import { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Layout, Tabs, Row, Col, List, Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import FavouriteButton from './FavouriteButton.js';
import PlayViewer from './PlayViewer.js';

import './Details.css';

const { Content } = Layout;
const { TabPane } = Tabs;

const Details = (props) => {
    const [ play, setPlay ] = useState([]);
    const { id } = useParams();
    
    // Load play data
    useEffect( () => {
        const getData = async () => {
            let data = JSON.parse(localStorage.getItem(id));
            if (!data) {
                try {
                    const url = 'http://localhost:8081/api/play/' + id;
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            setPlay(data[0]);
                            localStorage.setItem(id, JSON.stringify(data[0]))
                        });
                } catch (err) {
                    console.error(err);
                }
            } else {
                setPlay(data);
            }
        };
        
        getData();
    }, [id]);
    
    return (
        <Content id='details'>
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
            <div className='content'>
                <Tabs type='card' defaultActiveKey='1'>
                    <TabPane tab='Details' key='1'>
                        <Row gutter={32}>
                            <Col span={18}>
                                <h3>Description</h3>
                                <p>{play.desc}</p>
                            </Col>
                            <Col span={6}>
                                <h3>Details</h3>
                                <dl>
                                    <dt>Year</dt>
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

export default withRouter(Details);