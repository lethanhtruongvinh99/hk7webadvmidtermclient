import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
function Login(props) {
  //HOOK
  const localhost = "http://localhost:3000";
  const herokuhost = "https://hk7webadvmidtermserver.herokuapp.com";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState();
  const [isLogin, setIsLogin] = useState(false);
  // const [message, setMessage] = useState("");
  const history = useHistory();
  const loggedIn = () => {
    if (localStorage.getItem("accessToken")) {
      handleLogin();
    }
  };
  const handleGGLogin = async () => {
    window.open(herokuhost + "/login/google", "_self");
  };
  const handleFBLogin = async () => {
    window.open(herokuhost + "/login/facebook", "_self");
  };
  const login = async () => {
    let sendData = {
      username: username,
      password: password,
    };
    const response = await fetch(herokuhost + "/login", {
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
    loggedIn();
    if (isLogin) {
      handleLogin();
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  const handleLogin = () => {
    history.push("/dashboard");
  };
  const handleRegister = () => {
    history.push("/signup");
  };
  return (
    <div className="main-container">
      <div className="header">Đăng Nhập</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
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
          <label htmlFor="password">Mật khẩu</label>
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
        <hr />
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block"
          style={{ marginTop: "1rem" }}
        >
          Đăng nhập
        </button>
        <button
          type="button"
          className="btn btn-warning btn-lg btn-block"
          style={{ marginTop: "1rem" }}
          onClick={() => handleGGLogin()}
        >
          Đăng nhập với Google
        </button>
        <button
          type="button"
          className="btn btn-info btn-lg btn-block"
          style={{ marginTop: "1rem" }}
          onClick={() => {
            handleFBLogin();
          }}
        >
          Đăng nhập với Facebook
        </button>
        <hr />
        <p
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={handleRegister}
        >
          Tạo tài khoản
        </p>
      </form>
    </div>
  );
}
export default Login;
