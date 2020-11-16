import React, { useEffect, useState } from "react";
import Logo from "./scrum.png";
import { Link, useHistory } from "react-router-dom";

function Landing(props) {
  const accessToken = localStorage.getItem("accessToken");
  console.log(props.isLoggedIn + " Logged in");
  const history = useHistory();
  useEffect(() => {
    if (props.isLoggedIn) {
      handleLoggedIn();
    } else {
      handleLanding();
    }
  }, []);
  const handleLoggedIn = () => {
    history.push("/dashboard");
  };
  const handleLanding = () => {
    history.push("/hk7webadvmidtermclient");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="Logo">AnotherRetro</h1>
        </div>
        <div className="row" style={{ marginTop: "9rem" }}>
          <div className="col-6">
            <h1>Improve with Fun Sprint Retrospectives</h1>
            <h4>
              Collaborate with your remote team and get better in what you do
              with a simple, intuitive and beautiful tool
            </h4>
            <Link to="login" type="btn">
              <button className="btn btn-success" style={{ borderRadius: "" }}>
                Get Started for Free
              </button>
            </Link>
          </div>
          <div className="col-6">
            <img src={Logo} alt="scrumprocess" style={{width:"600px"}} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
