import { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Layout, Tabs, Row, Col, List, Select, Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import { FavouritesContext } from './FavouritesContext.js';
import FavouriteButton from './FavouriteButton.js';

import './Details.css';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

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
                <span>
                    <h1>{play.title}</h1>
                    <FavouriteButton play={play} size='large' />
                </span>
                <Button
                    shape='circle'
                    icon={<CloseCircleFilled style={{ fontSize: '20pt' }} />}
                    onClick={() => { props.history.goBack() }}
                    ghost />
            </div>
            <Tabs defaultActiveKey='1'>
                <TabPane tab='Details' key='1'>
                    <Row gutter={32}>
                        <Col span={18}>{play.desc}</Col>
                        <Col span={6}>
                            <h3>Details</h3>
                            <dl>
                                <dt>Year:</dt>
                                <dd>{play.likelyDate}</dd>
                                <dt>Genre:</dt>
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
                    { play.playText && <PlayText title={play.playText.title} acts={play.playText.acts} /> }
                </TabPane>
            </Tabs>
        </Content>
    );
};

const PlayText = (props) => {
    const [ currentAct, setAct ] = useState(props.acts[0]);
    const [ currentScene, setScene ] = useState(props.acts[0].scenes[0]);
    const [ currentPlayer, setPlayer ] = useState(null);
    
    // Generate list of players
    const players = [];
    currentScene.speeches.forEach(s => {
        if (!players.includes(s.speaker)) {
            players.push(s.speaker);
        }
    });
    
    const handleActChange = (value) => {
        const newAct = props.acts.find(a => a.name == value);
        setAct(newAct);
        setScene(newAct.scenes[0]); // Set scene to first scene of the act
        setPlayer(null); // Set player to all players
    };
    
    const handleSceneChange = (value) => {
        const newScene = currentAct.scenes.find(s => s.name == value);
        setScene(newScene);
        setPlayer(null); // Set player to all players
    };
    
    const handlePlayerChange = (value) => {
        setPlayer(value);
    }
    
    return (
        <Row gutter={32}>
            <Col span={7}>
                <h3>Play Navigation</h3>
                <Select value={currentAct.name} onChange={handleActChange}>
                    { props.acts.map(a => (
                        <Option value={a.name} key={a._id}>{a.name}</Option>
                    )) }
                </Select>
                <Select value={currentScene.name} onChange={handleSceneChange}>
                    { currentAct.scenes.map(s => (
                        <Option value={s.name} key={s._id}>{s.name}</Option>
                    )) }
                </Select>
                <Select value={currentPlayer} onChange={handlePlayerChange}>
                    <Option value={null}>ALL PLAYERS</Option>
                    { players.map(p => (
                        <Option value={p} key={p}>{p}</Option>
                    )) }
                </Select>
            </Col>
            <Col span={16}>
                <section>
                <h2>{props.title}</h2>
                    <article>
                        <h3>{currentAct.name}</h3>
                        <div>
                            <h4>{currentScene.name}</h4>
                            <p className='title'>{currentScene.title}</p>
                            <p className='direction'>{currentScene.stageDirection}</p>
                            { currentScene.speeches.map(s => (
                                <div key={s._id} className='speech'>
                                    <span className='speaker'>{s.speaker}</span>
                                    { s.lines.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            )) }
                        </div>
                    </article>
                </section>
            </Col>
        </Row>
    );
};

export default withRouter(Details);