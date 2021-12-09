import { Link } from 'react-router-dom';
import { Layout, Avatar, Space, Button, Typography, Divider, Descriptions, Row, Col } from 'antd';
import { LikeFilled } from '@ant-design/icons';

import './Account.css';

const { Content } = Layout;
const { Title } = Typography;

const Account = (props) => {
    /**
    Converts a date to something that is human readable. JavaScript doesn't
    have very robust support for this for some reason, so I have to write this
    manually.
    */
    const convertDate = (dateString) => {
        const dateParts = dateString.split('-');
        const date = new Date(
            dateParts[0],
            dateParts[1]-1, // month is 0-indexed
            dateParts[2]);
        const month = date.toLocaleString('default', { month: 'long'});
        
        return `${month} ${dateParts[2]}, ${dateParts[0]}`;
    };
    
    return (
        <Content id='account'>
            <Space
                className = 'title-container'
                size='large'
                align='center'>
                <Avatar
                    src='https://randomuser.me/api/portraits/women/2.jpg'
                    size={96} />
                <Title>{props.user.details.firstname} {props.user.details.lastname}</Title>
            </Space>
            <Row>
                <Col span={18}>
                    <Descriptions
                        title='Account Details'
                        column={1}>
                        <Descriptions.Item label='Location'>
                            {props.user.details.city}, {props.user.details.country}
                        </Descriptions.Item>
                        <Descriptions.Item label='Email'>
                            {props.user.email}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={6}>
                    <Descriptions
                        title='Stats'
                        column={1}>
                        <Descriptions.Item label={<span><LikeFilled /> Likes</span>}>
                            { props.user.membership.likes }
                        </Descriptions.Item>
                        <Descriptions.Item label='Joined'>
                            { convertDate(props.user.membership.date_joined) }
                        </Descriptions.Item>
                        <Descriptions.Item label='Last update'>
                            { convertDate(props.user.membership.last_update) }
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
            <Divider />
            <Link id='logout-btn' to='/logout'>
                <Button type='primary'>Logout</Button>
            </Link>
        </Content>
    )
};

export default Account;