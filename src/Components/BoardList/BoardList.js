import React, { useEffect, useState } from "react";
import BoardItem from "../BoardItem/BoardItem";
import { Modal } from "react-bootstrap";
import Header from "../Header/Header";
function BoardList(props) {
  //props is UserId
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isModalHide, setIsModalHide] = useState(false);
  const [boardName, setBoardName] = useState("");
  const userId = localStorage.getItem("userId");
  console.log(userId);
  useEffect(() => {
    loadData();
  }, []);
  const handleAddBoardBtn = () => {
    if (boardName.length === 0) {
      alert("Not null");
      return;
    }
    alert(boardName);
  };
  const requestAdd = () => {
    const response = fetch("http://localhost:3000/boards/add", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ userId: userId, boardName: boardName }),
    })
    //if response status === 200 do below 
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setIsModalHide(false);
          loadData();
        } else {
          return;
        }
      });
  };
  const loadData = () => {
    //const res = await fetch("https://hk7webadvmidtermserver.herokuapp.com/boards");
    const response = fetch(`http://localhost:3000/boards/userId=${userId}`)
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
          <small style={{ margin: "auto" }}>Add</small>
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
          <button className="btn btn-primary float-left" onClick={requestAdd}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default BoardList;
