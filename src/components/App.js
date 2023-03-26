import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Leaderboard from "./LeaderBoard"
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import NotFound from "./NotFound";

const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData());

  });

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" exact element={props.authedUser !== null ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/leaderboard" exact element={props.authedUser !== null ? <Leaderboard /> : <Navigate to='/login' />} />
          <Route path="/question/:id" element={props.authedUser !== null ? <Question /> : <Navigate to='/login' />} />
          <Route path="/add" element={props.authedUser !== null ? <NewQuestion /> : <Navigate to='/login' />} />
        </Routes>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
