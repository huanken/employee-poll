import { useNavigate } from "react-router-dom";
import { Tabs } from 'antd';
import { HomeOutlined, OrderedListOutlined, AppstoreAddOutlined, LoginOutlined } from "@ant-design/icons"

const items = [
  {
    key: '/',
    label: (
      <span>
        <HomeOutlined />
        Home
      </span>
    ),

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
  {
    key: '/login',
    label: (
      <span>
        <LoginOutlined />
        Login
      </span>
    ),
  },
];
const Nav = () => {
  const navigate = useNavigate();
  const onChange = (key) => {
    navigate(key);
  };

  return (
    <Tabs items={items}  activeKey={window.location.pathname} onChange={onChange} />
  )
}
export default Nav;