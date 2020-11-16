import React, { useEffect, useState } from "react";
import BoardList from "../BoardList/BoardList";
import "./style.css";
import Header from "../Header/Header";
function Dashboard(props) {
  const [isModalHide, setIsModalHide] = useState(false);
  const [boardName, setBoardName] = useState("");
  const GoogleLogin = async () => {
    const response = await fetch("http://localhost:3000/login/google/success", {
      method: "GET",
      // credentials: "include",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    GoogleLogin();
  }, []);
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <h1 className="float-left">My Boards</h1>
        </div>
        <div className="row">
          <p>
            {" "}
            {localStorage.getItem("accessToken")
              ? null
              : "Vui lòng đăng nhập để sử dụng!"}
          </p>
        </div>
        <div className="row">
          <BoardList />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
