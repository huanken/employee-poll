import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Leaderboard from "./LeaderBoard"
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Nav";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Question from "./Question";
import NewQuestion from "./NewQuestion";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        {props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/question/:id" element={<Question />} />
            <Route path="/new" element={<NewQuestion />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
