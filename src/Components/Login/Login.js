import React, { useEffect, useState } from "react";
import "./style.css";
function Login(props) {
  //HOOK
  const accessToken = localStorage.getItem("accessToken");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const fetchData = () => {
    let sendData = {
      username: username,
      password: password,
    };
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(sendData),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  const login = async () => {
    let sendData = {
      username: username,
      password: password,
    };
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(sendData),
    });
    if (response.status === 401) {
      const data = await response.json();
      setNotification(data.message);
    }
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      setIsLogin(true);
      handleLogin();
    }
  };
  useEffect(() => {
    if (accessToken) {
      handleLogin();
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  const handleLogin = () => {
    props.history.push("/dashboard");
  };
  return (
    <div className="main-container">
      <div className="header">Login</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="notification">{notification}</p>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
