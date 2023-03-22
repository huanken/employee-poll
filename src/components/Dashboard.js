import { connect } from "react-redux";
import { Card, Typography, Row, Col, Button } from 'antd';
import { formatDate } from "../utils/helpers.js";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Dashboard = ({ authedUser, questions, users }) => {

    let questionNew = [];
    let questionAnswered = [];
    const answers = users[authedUser].answers;

    Object.values(questions).forEach(question => {
        if (answers[question.id]) {
            questionAnswered.push(question)
        } else {
            questionNew.push(question)
        }
    });

    return (
        <>
            <Title level={2}>Dashboard</Title>
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
            <br />
            <br />
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
        </>
    );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
    authedUser,
    questions,
    users,
});

export default connect(mapStateToProps)(Dashboard);
