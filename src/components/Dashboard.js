import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = (props) => {
  return (
    <div>
      <h3 className="center">Dashboard Component</h3>
      {JSON.stringify(props)}
    </div>
  );
};

const mapStateToProps = ({ questions, users }) => ({
  questions,
  users
});

export default connect(mapStateToProps)(Dashboard);
