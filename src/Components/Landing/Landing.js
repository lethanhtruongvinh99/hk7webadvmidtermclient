import React, { useEffect, useState } from "react";

function Landing(props) {
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      handleLoggedIn();
    } else {
      handleLanding();
    }
  }, []);
  const handleLoggedIn = () => {
    props.history.push("/dashboard");
  };
  const handleLanding = () => {
    props.history.push("/");
  };
  return (
    <div>
      <p>Landing Page</p>
    </div>
  );
}
export default Landing;
