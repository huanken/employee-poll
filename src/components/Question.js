import { connect } from "react-redux";
import { Card, Typography, Avatar, Row, Col, Button, List, message } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";
import { handleInitialData } from "../actions/shared";

const { Title } = Typography;

const Question = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const question = props.questions[id];
    const owner = props.users[question.author];
    const currentUser = props.users[props.authedUser];
    const isAnswered = currentUser.answers[question.id] !== undefined;
    const userOptionOne = question.optionOne.votes;
    const userOptionTwo = question.optionTwo.votes;

    console.log("userOptionOne", userOptionOne);
    console.log("userOptionTwo", userOptionTwo);

    const handleAnswer = (e) => {
        e.preventDefault();
        const { dispatch, authedUser } = props;
        dispatch(
            handleAnswerQuestion({
                qid: question.id,
                answer: e.target.value,
                authedUser,
            })
        )
        props.dispatch(handleInitialData());
        message.success('Poll Successfully!');
        navigate('/');
    }

    return (
        <>
            {
                isAnswered
                    ?
                    <div className="question-custom" >
                        <Title level={2}>{`Poll by ${owner.name}`}</Title>
                        <Avatar size={220} src={`${owner.avatarURL}`} />
                        <br /><br /><br />
                        <Row className="card-question-row-custom" justify="space-between">
                            <Col className="card-question-col-custom">
                                <Card className="card-question-custom" title={<div>{`${question?.optionOne?.text}`}</div>}>
                                    <Title level={5}>{`Votes count: ${question?.optionOne?.votes.length}`}</Title>
                                    {question?.optionOne?.votes.length > 0 &&
                                        <><Title level={5}>{`Votes people: `}</Title><List
                                            size="small"
                                            bordered
                                            dataSource={userOptionOne}
                                            renderItem={(item) => <List.Item style={{ justifyContent: 'center' }}>{item}</List.Item>} /></>
                                    }
                                </Card>
                            </Col>
                            <Col className="card-question-col-custom">
                                <Card className="card-question-custom" title={<div>{`${question?.optionTwo?.text}`}</div>}>
                                    <Title level={5}>{`Votes count: ${question?.optionTwo?.votes.length}`}</Title>
                                    {question?.optionTwo?.votes.length > 0 &&
                                        <><Title level={5}>{`Votes people: `}</Title><List
                                            size="small"
                                            bordered
                                            dataSource={userOptionTwo}
                                            renderItem={(item) => <List.Item style={{ justifyContent: 'center' }}>{item}</List.Item>} /></>
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    :
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
            }
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
