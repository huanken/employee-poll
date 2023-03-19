import { connect } from "react-redux";
import Question from "./Question";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  return (
    <div>
      <div>QuestionPage Conponent</div>
      <Question id={props.id} />
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;

  return {
    authedUser, questions, users
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
