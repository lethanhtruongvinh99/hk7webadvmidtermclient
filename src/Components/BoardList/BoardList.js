import React, { useEffect, useState } from "react";
import BoardItem from "../BoardItem/BoardItem";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BoardList(props) {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
  } else {
  }
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isModalHide, setIsModalHide] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [notification, setNotification] = useState("");
  console.log(accessToken);
  useEffect(() => {
    loadData();
  }, []);
  const requestAdd = () => {
    const response = fetch("http://localhost:3000/boards/add", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      }),
      body: JSON.stringify({ boardName: boardName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadData();
      });
  };
  const requestAddNewBoard = async () => {
    const response = await fetch("http://localhost:3000/boards/add", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      }),
      body: JSON.stringify({ boardName: boardName }),
    });
    console.log(response);
    if (response.status === 200) {
      setIsModalHide(false);
    } else {
      const data = await response.json();
      setNotification(data.message);
    }
  };
  const loadData = () => {
    //const response = fetch("https://hk7webadvmidtermserver.herokuapp.com/boards")
    fetch("http://localhost:3000/boards", {
      headers: {
        mode: "no-cors",
        authorization: accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };
  return (
    <React.Fragment>
      <div
        className="card"
        style={{ width: "10rem" }}
        onClick={() => setIsModalHide(true)}
      >
        <div className="card-body">
          <i className="fa fa-plus" />
          <h4 style={{ paddingLeft: "30%", paddingTop:"50%" }}>Add</h4>
          <small style={{ paddingLeft: "25%" }}>new board</small>
        </div>
      </div>
      {data.map((item) => (
        <BoardItem
          key={item.boardId}
          BoardItem={item}
          onClick={() => alert(item.boardId)}
        />
      ))}
      <Modal
        show={isModalHide}
        onHide={() => setIsModalHide(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add New Board
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>BoardName</label>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p className="notification">{notification}</p>
          <a
            href="/dashboard"
            type="button"
            className="btn btn-primary float-left"
            onClick={requestAddNewBoard}
          >
            Confirm
          </a>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default BoardList;
