import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = (props) => {
  return (
    <div>
      <h3 className="center">Dashboard Component</h3>
      <Question/>
    </div>
  );
};

const mapStateToProps = ({ questions }) => ({
  questions
});

export default connect(mapStateToProps)(Dashboard);
