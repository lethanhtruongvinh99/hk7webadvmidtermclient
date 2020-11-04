import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./style.css";
function Login(props) {
  // const [username, setUsername] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  // //handle button Login
  // const handleLogin = () => {
  //   props.history.push("/dashboard");
  // };
  // return (
  //   <div className="main-container">
  //     <div className="header">Login</div>
  //     <form>
  //       <div className="form-group">
  //         <label htmlFor="username">Username</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="username"
  //           name="username"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="password">Password</label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           id="password"
  //           name="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </div>
  //       <button type="submit" className="btn btn-primary">
  //         Login
  //       </button>
  //     </form>
  //   </div>
  // );

  //HOOK

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState();
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const fetchData = async () => {
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
        if (data.status === 200) {
          setIsLogin(true);
        }
      });
  };
  useEffect(() => {
    // fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      setNotification("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    // fetchData();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setIsLogin(true);
          setUser(data.user);
          localStorage.setItem("userId", data.user.userId);
          handleLogin();
        } else {
          setNotification("Error");
          setIsLogin(false);
        }
      });
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p className="notification">{notification}</p>
      </form>
    </div>
  );
}
export default Login;
