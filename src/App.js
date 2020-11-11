import "./App.css";
import React, { useEffect, useState } from "react";
import BoardList from "./Components/BoardList/BoardList";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Dashboard from "./Components/Dashboard/Dashboard";
import BoardDetail from "./Components/BoardDetail/BoardDetail";
function App(props) {
  return (
    <div>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path={`/boardID:boardId`} component={BoardDetail} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
