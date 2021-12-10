import { Modal, Button, List, Divider, Row, Col } from 'antd';

import './About.css';

const About = (props) => {    
    const librariesNode = [
        {
            title: 'node.js',
            desc: 'Server environment.'
        },
        {
            title: 'express & express-flash',
            desc: 'Handles all routing for authentication and API requests.'
        },
        {
            title: 'express-session',
            desc: 'Adds session support to Express.'
        },
        {
            title: 'mongoose',
            desc: 'ORM for querying MongoDB.'
        },
        {
            title: 'passport & passport-local',
            desc: 'For authentication.'
        },
        {
            title: 'bcrypt',
            desc: 'Hashing function for passwords.'
        },
        {
            title: 'ejs',
            desc: 'EJS - Embedded JavaScript Templates. Used to generate the login page.'
        },
        {
            title: 'dotenv',
            desc: 'Adds property/config file support.'
        }
    ];
    
    const librariesReact = [
        {
            title: 'antd',
            desc: 'Components from Ant Design.'
        },
        {
            title: 'craco & craco-less',
            desc: 'CRACO - Create React App Configuration Override (required for customizing Ant Design themes).'
        },
        {
            title: 'react-router-dom',
            desc: 'Adds routing to single-page React applications.'
        },
        {
            title: 'react-transition-group (1.2.1)',
            desc: 'Enables CSS transitions for React components.'
        },
        {
            title: 'react-highlight-words',
            desc: 'A simple library that highlights words in a text.'
        },
        {
            title: 'react-collapse',
            desc: 'A wrapper for creating collapsible React components.'
        }
    ];
    
    return (
        <Modal
            className='about-modal'
            title='COMP 4513 Assignment 2 - Fall 2021'
            width={1024}
            visible={props.visible}
            onCancel={props.closeModal}
            style={{ top: '20px' }}
            footer={[
                <Button key='submit'
                    type='primary'
                    onClick={props.closeModal}>
                    OK
                </Button>
            ]}>
            <h1>shakespea.re: A Shakespeare play browser.</h1>
            <h2>by Chris Hunter</h2>
            <a href='https://github.com/chunt661/comp4513asg2'>GitHub repository</a>
            <Divider />
            <p>shakespea.re is a Shakespeare play browser that contains basic information on most of William Shakespeare's work.</p>
            <p>The front-end was made with React, using components from Ant Design.</p>
            <p>This website interacts with a custom Node.js server that handles API requests and user authentication. The API was developed with Express and utilizes the Mongoose library to retrieve data from a MongoDB database. Session-based user authentication is performed with Passport.</p>
            <p>See below for a full list of libraries and packages used in this project.</p>
            <h3>API Links</h3>
            <div className='link-container'>
                <a href={'/api/list'}>Plays List</a>
                <a href={'/api/play/alls_well_that_ends_well'}>Single Play</a>
                <a href={'/api/user/1'}>User Details</a>
            </div>
            <Divider />
            <h3>Technology</h3>
            <Row gutter={8}>
                <Col span={12}>
                <List
                    header={<h4>Server-side Technologies</h4>}
                    bordered
                    dataSource={librariesNode}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description={item.desc} />
                        </List.Item>
                    )}
                    />
                </Col>
                <Col span={12}>
                <List
                    header={<h4>React Libraries</h4>}
                    bordered
                    dataSource={librariesReact}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description={item.desc} />
                        </List.Item>
                    )}
                    />
                </Col>
            </Row>
        </Modal>
    );
};

export default About;