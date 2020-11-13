import React, { useEffect, useState } from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Link, Redirect, useHistory } from "react-router-dom";

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
    // <Redirect to="/dashboard" />;
  };
  const handleLanding = () => {
    history.push("/");
    // <Redirect to="/signup" />;
  };
  return (
    <div>
      <p>Landing Page</p>
      <Link to="login" type="btn">
        Đăng Nhập
      </Link>
    </div>
  );
}
export default Landing;
