import "./App.css";
import React from "react";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Dashboard from "./Components/Dashboard/Dashboard";
import BoardDetail from "./Components/BoardDetail/BoardDetail";
import Profile from "./Components/Login/Profile";
function App(props) {
  const checkLoggedIn = false;
  // useEffect(() => {});
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Landing isLoggedIn={checkLoggedIn} />}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path={`/boardID:boardId`} component={BoardDetail} />
            {/* <Route path="/" exact>
              <Landing isLoggedIn={checkLoggedIn} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path={`/boardID:boardId`}>
              <BoardDetail />
            </Route> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
