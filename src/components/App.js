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
import useAuth from "./customHook/useAuth";
import { useLocation } from 'react-router-dom';
import { AuthProvider } from "./customHook/useAuth";

function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <AuthProvider>
          <Nav />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/" exact element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/leaderboard" exact element={
              <RequireAuth>
                <Leaderboard />
              </RequireAuth>
            } />
            <Route path="/questions/:id" element={
              <RequireAuth>
                <Question />
              </RequireAuth>
            } />
            <Route path="/add" element={
              <RequireAuth>
                <NewQuestion />
              </RequireAuth>
            } />
          </Routes>
        </AuthProvider>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
