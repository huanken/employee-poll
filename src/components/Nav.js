import { useNavigate } from "react-router-dom";
import { Avatar, Tabs, Button, Popconfirm } from 'antd';
import { HomeOutlined, OrderedListOutlined, AppstoreAddOutlined, LoginOutlined } from "@ant-design/icons"
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import useAuth from "./customHook/useAuth";

const Nav = (props) => {

  const items = [
    {
      key: '/',
      label: (
        <span role="home">
          <HomeOutlined />
          Home
        </span>
      )
    },
    {
      key: '/leaderboard',
      label: (
        <span role='leaderboard'>
          <OrderedListOutlined />
          Leaderboard
        </span>
      ),
    },
    {
      key: '/add',
      label: (
        <span role='add'>
          <AppstoreAddOutlined />
          New
        </span>
      ),
    },
  ];
  const { authed, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    props.dispatch(setAuthedUser(null));
    logout();
    navigate('/login');
  }

  const operation = (
    (props.authedUser === null || !authed)
      ?
      <Button role="buttonLogin" icon={<LoginOutlined />} onClick={() => navigate('/login')}>Login</Button>
      :
      <>
        <span>
          <Avatar src={props?.userLogin?.avatarURL} />
          {props?.userLogin?.id}
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
  userLogin: users[authedUser],
  authedUser
});

export default connect(mapStateToProps)(Nav);