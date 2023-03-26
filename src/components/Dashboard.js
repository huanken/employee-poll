import { connect } from "react-redux";
import { Card, Typography, Row, Col, Button, Radio } from 'antd';
import { formatDate } from "../utils/helpers.js";
import { Link } from "react-router-dom";
import { useState } from "react";

const { Title } = Typography;

const Dashboard = ({ authedUser, questions, users }) => {

    let questionNew = [];
    let questionAnswered = [];

    if (authedUser) {
        const answers = users[authedUser].answers;

        Object.values(questions).sort((a, b) => b.timestamp - a.timestamp).forEach(question => {
            if (answers[question.id]) {
                questionAnswered.push(question)
            } else {
                questionNew.push(question)
            }
        });
    } else {
        questionNew = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp)
    }

    const [mode, setMode] = useState('notAnswered');
    const handleModeChange = (e) => {
        setMode(e.target.value);
    };

    return (
        <>
            <Title level={2}>Dashboard</Title>

            <Radio.Group
                onChange={handleModeChange}
                value={mode}
                style={{
                    marginBottom: 8,
                }}
            >
                <Radio.Button value="notAnswered">{'Not Answered'}</Radio.Button>
                <Radio.Button value="answered">{'Answered'}</Radio.Button>
            </Radio.Group>
            {
                mode === 'notAnswered' &&
                <Card title="New Questions" align="middle">
                    <Row >
                        {questionNew.map(question => {
                            return (
                                <Col span={6} className="card-col-custom" key={question.id}>
                                    <Card type="inner" title=
                                        {
                                            <div>
                                                <div>
                                                    {users[question.author].name}
                                                </div>
                                                <div>
                                                    {formatDate(question.timestamp)}
                                                </div>
                                            </div>
                                        }
                                    >
                                        <Link to={`/question/${question.id}`}>
                                            <Button >Show Question</Button>
                                        </Link>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row >
                </Card>
            }

            {
                mode === 'answered' &&
                <Card title="Done" align="middle">
                    <Row >
                        {questionAnswered.map(question => {
                            return (
                                <Col span={6} className="card-col-custom" key={question.id}>
                                    <Card type="inner" title=
                                        {
                                            <div>
                                                <div>
                                                    {users[question.author].name}
                                                </div>
                                                <div>
                                                    {formatDate(question.timestamp)}
                                                </div>
                                            </div>}
                                    >
                                        <Link to={`/question/${question.id}`}>
                                            <Button >Show Question</Button>
                                        </Link>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row >
                </Card>
            }
        </>
    );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
    authedUser,
    questions,
    users,
});

export default connect(mapStateToProps)(Dashboard);
