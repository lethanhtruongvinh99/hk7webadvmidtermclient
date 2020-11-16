import "./App.css";
import React from "react";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Dashboard from "./Components/Dashboard/Dashboard";
import BoardDetail from "./Components/BoardDetail/BoardDetail";
import Profile from "./Components/Login/Profile";
import CheckAuth from "./Components/CheckAuth/CheckAuth";
function App(props) {
  const checkLoggedIn = false;
  // useEffect(() => {});
  //to use that app with local host, use BrowserRouter and all
  return (
    <div>
      <HashRouter basename="">
        <div>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/checkauth" component={CheckAuth} />
            <Route path={`/boardID:boardId`} component={BoardDetail} />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
