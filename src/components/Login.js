import { Button, Typography, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const { Title } = Typography;

const Login = (props) => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const id = Form.useWatch("id", form);

    const handleSubmit = () => {
        if (props.users[id]) {
            props.dispatch(setAuthedUser(id));
            message.success(`Login as ${id}`);
            navigate("/");
        } else {
            message.error("This users isn't exist");
        }

    };

    return (
        <>
            <Title level={2}>Employee Poll App</Title>
            <Title level={4}>Login</Title>
            <Form
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
            >
                <Form.Item label="Username" name="id" >
                    <Input placeholder="Username"/>
                </Form.Item>
                <Form.Item label="Password" name="password" >
                    <Input placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button role="button" type="primary" htmlType="submit" disabled={!id}>Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
};

const mapStateToProps = ({ users }) => ({
    users,
});

export default connect(mapStateToProps)(Login);