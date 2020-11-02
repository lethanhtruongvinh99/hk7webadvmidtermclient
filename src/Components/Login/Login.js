import React, { useState } from "react";
import "./style.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("click on Log in");
    // if (remember){
    //     localStorage.setItem("username", username);
    //     localStorage.setItem("password", password);
    // }
  };
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRemember = (e) => {
    setRemember(!remember);
  };
  return (
    <div className="main-container">
      <div className="header">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={handleChangeUsername}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handleChangePassword}
          />
        </div>
        {/* <div className="form-group form-check">
          <label className="form-check-label" htmlFor="remember">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              onChange={handleChangeRemember}
            />
            Remember
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
