import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Column from "../Column/Column";
import Header from "../Header/Header";
import Task from "../Task/Task";

function BoardDetail(props) {
  const defaultUrl = "http://localhost:3001";
  const accessToken = localStorage.getItem("accessToken");
  let url = useRouteMatch();
  const boardId = url.params.boardId;
  const [data, setData] = useState();
  const [boardData, setBoardData] = useState({});
  const handleShareButton = () => {
    navigator.clipboard.writeText(defaultUrl + url.url);
    console.log(url.url);
    alert(url.url);
  };
  const loadBoardInfo = async () => {
    const response = await fetch(
      `http://localhost:3000/boards/boardId=${boardId}`,
      {
        method: "GET",
        headers: {
          authorization: accessToken,
          "content-type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setBoardData(data);
    }
  };
  const loadBoardColumn = async () => {
      
  }
  useEffect(() => {
    loadBoardInfo();
  }, []);

  return (
    <div>
      <Header />
      <div className="container-fluid bg-light">
        <div className="row">
          <h1 className="bg-light text-primary text-center">
            {boardData.boardName}
          </h1>
          <br />
        </div>
        <div className="row" style={{ marginBottom: "1rem" }}>
          <button
            className="btn btn-primary"
            style={{
              color: "white",
              marginLeft: "10px",
              marginRight: "1rem",
            }}
          >
            Thêm cột mới
          </button>
          <button
            className="btn btn-primary"
            onClick={handleShareButton}
            style={{
              color: "white",
            }}
          >
            Chia sẻ
          </button>
        </div>
        <div className="row">
          {/* list of Columns */}
          <Column />
          <Column />
          <Column />
        </div>
      </div>
    </div>
  );
}
export default BoardDetail;
