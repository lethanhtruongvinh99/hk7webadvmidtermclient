import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import "./style.css";
function Signup() {
  const error = [
    "Mật khẩu chưa khớp",
    "Mật khẩu phải từ 6 đến 20 ký tự",
    "Tên đang nhập đã tồn tại",
  ];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      setNotification("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const signUpStatus = fetch("http://localhost:3000/signup", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNotification(data.message);
      });
  };

  return (
    <div className="main-container">
      <div className="header">Sign Up</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="notification">{notification}</p>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default Signup;
