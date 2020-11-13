import React, { useEffect, useState } from "react";
import BoardItem from "../BoardItem/BoardItem";
import { Modal } from "react-bootstrap";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BoardList(props) {
  //check is token is expire or not ?
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
  } else {
  }
  const [data, setData] = useState([]);
  const [isModalHide, setIsModalHide] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [notification, setNotification] = useState("");
  useEffect(() => {
    loadData();
  }, []);
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
      const dataRes = await response.json();
      console.log(dataRes.data);
      setData(data.concat(dataRes.data));
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
          <FontAwesomeIcon icon={faPlusCircle} size="4x" style={{color: "green", marginLeft: "23%"}}/>
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
      <div>
        <Modal
          show={isModalHide}
          onHide={() => setIsModalHide(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Thêm bảng mới
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Tên bảng</label>
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <p className="notification">{notification}</p>
            <button
              // href="/dashboard"
              type="button"
              className="btn btn-primary float-left"
              onClick={requestAddNewBoard}
            >
              Xác nhận
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default BoardList;
