import React, { useEffect, useState } from "react";

function Landing(props) {
  const handleRemember = () => {
    if (localStorage.getItem("userId") === null) {
    } else {
      props.history.push("/dashboard");
    }
  };
  useEffect(() => {
    handleRemember();
  });
  return (
    <div>
      <p>Landing Page</p>
    </div>
  );
}
export default Landing;
