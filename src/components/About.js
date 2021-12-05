import { Modal, List, Divider } from 'antd';

import './About.css';

const About = (props) => {
    const apiLinkPrefix = 'http://localhost:8081/api/';
    
    const libraries = [
        {
            title: 'react-collapse',
            desc: 'Wrapper for collapsible components.'
        },
        {
            title: 'craco',
            desc: 'Create React App Configuration Override (CRACO). A configuration layer for React. (required for customizing Ant Design themes)'
        },
        {
            title: 'craco-less',
            desc: 'Plugin that adds Less support to CRACO. (required for customizing Ant Design themes)'
        },
        {
            title: 'react-router-dom',
            desc: 'React Router. Adds dynamic routing.'
        },
        {
            title: 'react-highlight-words',
            desc: 'Highlights words.'
        },
        {
            title: 'react-transition-group (version 1.2.1)',
            desc: 'Enables transitions for React components.'
        }
    ];
    
    return (
        <Modal
            className='about-modal'
            title='About'
            width={720}
            visible={props.visible}
            onOk={props.closeModal}>
            <h1>COMP 4513 Assignment 2</h1>
            <p>Chris Hunter</p>
            <p>shakespea.re: A Shakespeare play browser. Front-end made with React and Ant Design components.</p>
            <a href='https://github.com/chunt661/comp4513asg2'>GitHub repository</a>
            <h2>API Links</h2>
            <div className='link-container'>
                <a href={apiLinkPrefix + 'list/'}>Plays List</a>
                <a href={apiLinkPrefix + 'play/alls_well_that_ends_well'}>Single Play</a>
                <a href={apiLinkPrefix + 'user/1'}>User Details</a>
            </div>
            <Divider />
            <h2>Libraries</h2>
            <div className='list-container'>
                <List
                    dataSource={libraries}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description={item.desc} />
                        </List.Item>
                    )}
                    />
            </div>
        </Modal>
    );
};

export default About;


<table>
    <tr>
        <td>react-collapse</td>
        <td>Wrapper for collapsible components.</td>
    </tr>
    <tr>
        <td>craco</td>
        <td>Create React App Configuration Override (CRACO). A configuration layer for React. (required for customizing Ant Design themes)</td>
    </tr>
    <tr>
        <td>craco-less</td>
        <td>Plugin that adds Less support to CRACO. (required for customizing Ant Design themes)</td>
    </tr>
    <tr>
        <td>react-router-dom</td>
        <td>React Router. Adds dynamic routing.</td>
    </tr>
    <tr>
        <td>react-highlight-words</td>
        <td>Highlights words.</td>
    </tr>
    <tr>
        <td>react-transition-group</td>
        <td>(version 1.2.1) Enables transitions for React components.</td>
    </tr>
</table>