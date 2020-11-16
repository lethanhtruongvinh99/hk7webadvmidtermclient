import React, { useEffect, useState } from "react";
import BoardList from "../BoardList/BoardList";
import "./style.css";
import Header from "../Header/Header";
function Dashboard(props) {
  const localhost = "http://localhost:3000";
  const herokuhost = "https://hk7webadvmidtermserver.herokuapp.com";
  const [isModalHide, setIsModalHide] = useState(false);
  const [boardName, setBoardName] = useState("");
  useEffect(() => {
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
