import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Column from "../Column/Column";
import Header from "../Header/Header";
import { Modal } from "react-bootstrap";

function BoardDetail(props) {
  const localhost = "http://localhost:3000";
  const herokuhost = "https://hk7webadvmidtermserver.herokuapp.com";
  const defaultLocalUrl = "http://localhost:3001";
  const githubpagesUrl = "https://lethanhtruongvinh99.github.io/hk7webadvmidtermclient/#/"
  const accessToken = localStorage.getItem("accessToken");
  let url = useRouteMatch();
  const boardId = url.params.boardId;
  const [data, setData] = useState([]);
  const [boardData, setBoardData] = useState({});
  const [addColumnModalHide, setAddColumnModalHide] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [notification, setNotification] = useState("");
  const handleShareButton = () => {
    navigator.clipboard.writeText("https://lethanhtruongvinh99.github.io/hk7webadvmidtermclient/#/" + url.url);
    alert("Đã copy vào clipboard!");
  };
  const loadBoardInfo = async () => {
    const response = await fetch(
      // `http://localhost:3000/boards/boardId=${boardId}`,
      `https://hk7webadvmidtermserver.herokuapp.com/boards/boardId=${boardId}`,
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
      console.log(data);
      setBoardData(data);
    }
  };
  const loadBoardColumns = async () => {
    const response = await fetch(herokuhost + "/columns/columns", {
      method: "POST",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({ boardId: boardId }),
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setData(data);
    }
  };
  const requestAddNewColumn = async () => {
    const response = await fetch(herokuhost + "/columns/add", {
      method: "POST",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({ boardId: boardId, taskName: newColumnName }),
    });
    if (response.status === 200) {
      const dataRes = await response.json();
      setData(data.concat(dataRes.data));
      alert(dataRes.message);
      setNewColumnName("");
      setAddColumnModalHide(false);
    } else {
      const dataRes = await response.json();
      alert(dataRes.message);
    }
  };
  useEffect(() => {
    loadBoardInfo();
    loadBoardColumns();
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
            onClick={() => setAddColumnModalHide(true)}
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
          {data.map((item) => (
            <Column key={item.taskId} ColumnItem={item} />
          ))}
        </div>
        <div>
          <Modal
            show={addColumnModalHide}
            onHide={() => setAddColumnModalHide(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Thêm cột mới
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <label>Tên cột</label>
                <input
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <p className="text-dangerous" style={{ fontStyle: "italic" }}>
                {notification}
              </p>
              <button
                // href="/dashboard"
                type="button"
                className="btn btn-primary float-left"
                onClick={requestAddNewColumn}
              >
                Xác nhận
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default BoardDetail;
