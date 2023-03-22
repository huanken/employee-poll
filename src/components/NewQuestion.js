import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Form, Input, message } from 'antd';
const { Title } = Typography;

const NewQuestion = ({ dispatch }) => {
  const [form] = Form.useForm();
  const option1 = Form.useWatch("option1", form);
  const option2 = Form.useWatch("option2", form);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      optionOneText: option1,
      optionTwoText: option2
    }
    dispatch(handleAddQuestion(data));
    form.resetFields();
    message.success('Poll created!');
    navigate("/");

  };

  return (
    <>
      <Title level={2}>Would You Rather</Title>
      <Title level={4}>Create Your Own Poll</Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item label="First Option" name="option1" >
          <Input placeholder="Option One" />
        </Form.Item>
        <Form.Item label="Second Option" name="option2" >
          <Input placeholder="Option Two" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!(option1 && option2)}>Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default connect()(NewQuestion);
