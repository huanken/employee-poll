import { connect } from "react-redux";
import { Card, Typography, Avatar, Row, Col, Button } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";

const { Title } = Typography;

const Question = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = props.questions[id];
  const owner = props.users[question.author];

  const handleAnswer = (e) => {
    e.preventDefault();
    const { dispatch, authedUser } = props;
    dispatch(
      handleAnswerQuestion({
        qid: question.id,
        answer: e.target.value,
        authedUser,
      })
    ).then(navigate('/'));
  }

  return (
    <>
      <div className="question-custom" >
        <Title level={2}>{`Poll by ${owner.name}`}</Title>
        <Avatar size={220} src={`${owner.avatarURL}`} />
        <br /><br /><br />

        
        <Title level={2}>{`Would You Rather`}</Title>
        <br /><br />
        <Row className="card-question-row-custom" justify="space-between">
          <Col className="card-question-col-custom">
            <Card className="card-question-custom" title={<div>{`${question?.optionOne?.text}`}</div>}>
              <Button value="optionOne" onClick={handleAnswer}>Click</Button>
            </Card>
          </Col>
          <Col className="card-question-col-custom">
            <Card className="card-question-custom" title={<div>{`${question?.optionTwo?.text}`}</div>}>
              <Button value="optionTwo" onClick={handleAnswer}>Click</Button>
            </Card>
          </Col>
        </Row>
      </div>
    </>

  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  return {
    authedUser,
    users,
    questions,
  }
};

export default connect(mapStateToProps)(Question);
