import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./style.css";

function BoardItem(props) {
  const accessToken = localStorage.getItem("accessToken");
  const [deleteModalHide, setDeleteModelHide] = useState(false);
  const [editModalHide, setEditModalHide] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [showBoard, setShowBoard] = useState(true);
  useEffect(() => {}, []);
  const handleConfirmEdit = async () => {
    const response = await fetch("http://localhost:3000/boards/update", {
      method: "POST",
      headers: new Headers({
        authorization: accessToken,
        "content-type": "application/json",
      }),
      body: JSON.stringify({
        boardId: props.BoardItem.boardId,
        newBoardName: newBoardName,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      alert(data.message);
      props.BoardItem.boardName = newBoardName;
      setEditModalHide(false);
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };
  const hideDeletedBoard = () => {
    if (props.BoardItem.isDeleted === 1) setShowBoard(!showBoard);
  };
  const handleDeleteBoard = () => {
    requestDeleteBoard();
    setDeleteModelHide(true);
  };

  const requestDeleteBoard = async () => {
    const response = await fetch("http://localhost:3000/boards/delete", {
      method: "POST",
      headers: new Headers({
        authorization: accessToken,
        "content-type": "application/json",
      }),
      body: JSON.stringify({ boardId: props.BoardItem.boardId }),
    });
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      props.BoardItem.isDeleted = 1;
      hideDeletedBoard();
      alert(data.message);
    } else {
      const data = await response.json();
      alert(data.message);
      setDeleteModelHide(false);
    }
  };
  return (
    <>
      {showBoard && (
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
              onClick={() => setEditModalHide(true)}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: "5px" }}
              onClick={() => setDeleteModelHide(true)}
            >
              Xóa
            </button>
          </div>
          <div>
            {/* Edit Modal */}
            <Modal
              show={editModalHide}
              onHide={() => setEditModalHide(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Sửa tên bảng
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <label>Tên mới</label>
                  <input
                    type="text"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    required
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-primary float-left"
                  onClick={() => handleConfirmEdit()}
                >
                  Xác nhận
                </button>
              </Modal.Footer>
            </Modal>
            {/* Delete Modal */}
            <Modal
              show={deleteModalHide}
              onHide={() => setDeleteModelHide(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Xóa bảng
                </Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <button
                  className="btn btn-danger float-left"
                  onClick={() => handleDeleteBoard()}
                >
                  Xác nhận
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}

export default BoardItem;
