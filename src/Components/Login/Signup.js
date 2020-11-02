import React, { useState } from "react";
import "./style.css";
function Signup() {
  const error = [
    "Mật khẩu chưa khớp",
    "Mật khẩu phải từ 6 đến 20 ký tự",
    "Tên đang nhập đã tồn tại",
  ];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [hasError, setHasError] = useState(false);
  const  handleSubmit = async (e) => {
    e.preventDefault();
    // if (password.length < 6 || password.length > 20) {
    //   setNotification(error[1]);
    // } else if (password !== confPassword) {
    //   setNotification(error[0]);
    // } else {
    //   setNotification("");
    // }
    const form = e.target;
    const data = new FormData(form);
    alert(JSON.stringify(Object.fromEntries(data)));
    await fetch("http://localhost:3000/signup", {
      method:"POST",
      body: JSON.stringify(Object.fromEntries(data)),
    });
  };
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfPassword = (e) => {
    setConfPassword(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="header">Sign Up</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChangeUsername}
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
            onChange={handleChangePassword}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confPassword"
            name="confPassword"
            onChange={handleChangeConfPassword}
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
