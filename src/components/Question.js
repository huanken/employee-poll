import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate, Link } from "react-router-dom";

const Question = (props) => {

  return (
  <div>Question Component</div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  return {
    authedUser,
    users,
    questions
  }
};

export default connect(mapStateToProps)(Question);
