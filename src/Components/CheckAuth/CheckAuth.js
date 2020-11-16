import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function CheckAuth() {
  const history = useHistory();
  const [notification, setNotification] = useState("");
  useEffect(() => {
    getFromRedirect();
  }, []);
  const getFromRedirect = async () => {
    const response = await fetch("http://localhost:3000/login/google/success");
    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("accessToken", data.accessToken);
    }
    if (localStorage.getItem("accessToken")) {
      setNotification("Đang chuyển hướng...");
      history.push("/dashboard");
    } else {
      setNotification("Đăng nhập thất bại");
      history.push("/login");
    }
  };
  return (
    <div>
      <p>{notification}</p>
    </div>
  );
}
export default CheckAuth;
