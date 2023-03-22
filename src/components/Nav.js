import { useNavigate } from "react-router-dom";
import { Avatar, Tabs, Button, Popconfirm } from 'antd';
import { HomeOutlined, OrderedListOutlined, AppstoreAddOutlined, LoginOutlined } from "@ant-design/icons"
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Nav = (props) => {

  const items = [
    {
      key: '/',
      label: (
        <span>
          <HomeOutlined />
          Home
        </span>
      )
    },
    {
      key: '/leaderboard',
      label: (
        <span>
          <OrderedListOutlined />
          Leaderboard
        </span>
      ),
    },
    {
      key: '/new',
      label: (
        <span>
          <AppstoreAddOutlined />
          New
        </span>
      ),
    },
  ];

  const navigate = useNavigate();
  const handleLogout = () => {
    props.dispatch(setAuthedUser(null));
    navigate('/login');
  }

  const operation = (
    <>
      <span>
        <Avatar src={props.userLogin.avatarURL} />
        {props.userLogin.id}
      </span>
      <span> </span>
      <Popconfirm title={'Wanna logout?'} onConfirm={handleLogout} okText={'Yes'} cancelText={'No'}>
        <Button icon={<LoginOutlined />}>Logout</Button>
      </Popconfirm>
    </>
  );

  return (
    <Tabs items={items} activeKey={window.location.pathname} onChange={key => navigate(key)} tabBarExtraContent={operation} />
  )
}

const mapStateToProps = ({ users, authedUser }) => ({
  userLogin: users[authedUser]
});

export default connect(mapStateToProps)(Nav);