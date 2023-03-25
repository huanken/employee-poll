import { connect } from 'react-redux'
import { Table, List, Typography, Avatar } from 'antd';

const { Column } = Table;
const { Title } = Typography;

const Leaderboard = (props) => {

    let userArr = [];
    Object.values(props.users)
    .sort((a,b) => (Object.keys(b?.answers).length + b?.questions.length) - (Object.keys(a?.answers).length + a?.questions.length))
    .forEach(user => userArr.push(user))

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