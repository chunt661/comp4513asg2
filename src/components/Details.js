import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Tabs, Row, Col, List } from 'antd';

import './Details.css';

const { Content } = Layout;
const { TabPane } = Tabs;

const Details = (props) => {
    const [ play, setPlay ] = useState([]);
    const { id } = useParams();
    
    // Load play data
    useEffect( () => {
        const getData = async () => {
            console.log('fetching');
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
                console.log(data);
                setPlay(data);
            }
        };
        
        getData();
    }, [id]);
    
    return (
        <Content id='details'>
            <h1>{play.title}</h1>
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
                </TabPane>
                <TabPane
                    tab='Text'
                    key='3'
                    {...(!play.filename && {disabled: true})}>
                    
                </TabPane>
            </Tabs>
        </Content>
    );
};

export default Details;