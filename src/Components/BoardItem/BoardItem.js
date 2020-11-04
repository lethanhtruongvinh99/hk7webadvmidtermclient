import React, { useEffect, useState } from "react";
import { Link, Redirect, Route, useRouteMatch } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./style.css";
import BoardDetail from "../BoardDetail/BoardDetail";
import Switch from "react-bootstrap/esm/Switch";
function BoardItem(props) {
  let match = useRouteMatch();
  const [delModalHide, setDelModelHide] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  useEffect(() => {});
  const handleConfirmEdit = () => {
    const response = fetch("http://localhost:3000/boards/update", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        boardId: props.BoardItem.boardId,
        newBoardName: newBoardName,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setDelModelHide(false);
  };
  const handleOnDeleteCard = () => {
    const response = fetch(
      `http://localhost:3000/boards/delete/boardId=${props.BoardItem.boardId}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.BoardItem.boardName}</h5>
          <p className="card-text">{props.BoardItem.isCreated}</p>
          <small className="float-left" style={{ fontStyle: "italic" }}>
            By: {props.BoardItem.userId}
          </small>
        </div>
        <div className="card-footer">
          <Link
            to={`/boardID${props.BoardItem.boardId}`}
            className="btn btn-primary"
          >
            Xem
          </Link>
          <button
            className="btn btn-warning"
            style={{ marginLeft: "5px" }}
            onClick={() => setDelModelHide(true)}
          >
            Sửa
          </button>
          <a
            href="/dashboard"
            className="btn btn-danger"
            style={{ marginLeft: "5px" }}
            onClick={handleOnDeleteCard}
          >
            Xóa
          </a>
        </div>
        <div>
          <Modal
            show={delModalHide}
            onHide={() => setDelModelHide(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Edit Board Name {props.BoardItem.boardId}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <label>New Name</label>
                <input
                  type="text"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <a href="/dashboard" className="btn btn-primary float-left" onClick={handleConfirmEdit}>
                Confirm
              </a>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default BoardItem;
