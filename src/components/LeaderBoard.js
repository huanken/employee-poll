import { connect } from 'react-redux'
import { Table, List, Typography, Avatar } from 'antd';
import { useState } from 'react';

const { Column } = Table;
const { Title } = Typography;

const Leaderboard = (props) => {
    const [users,] = useState(props.users);

    let userArr = [];
    Object.values(props.users).forEach(user => userArr.push(user))

    return (
        <>
            <Title level={2}>Users list</Title>
            <Table dataSource={userArr} rowKey={'id'} pagination={false} bordered>
                <Column
                    title="Users"
                    key="id"
                    width="50%"
                    render={(_, record) => (
                        <List itemLayout="horizontal">
                            <List.Item className="list-item-custom">
                                <List.Item.Meta
                                    avatar={<Avatar src={record?.avatarURL} />}
                                    title={record?.name}
                                    description={record?.id}
                                />
                            </List.Item>
                        </List>
                    )}
                />
                <Column 
                    title={'Answered'} 
                    dataIndex="answers" 
                    key="questions" 
                    align="center"
                    render={(value, _) => {
                        return <>{Object.keys(value)?.length}</>;
                    }} />
                <Column 
                    title={'Created'} 
                    dataIndex="questions" 
                    key="questions" 
                    align="center"
                    render={(value, _) => {
                        return <>{value?.length}</>;
                    }} />
            </Table>
        </>
    )
}

const mapStateToProps = ({ users }) => ({
    users
});

export default connect(mapStateToProps)(Leaderboard);