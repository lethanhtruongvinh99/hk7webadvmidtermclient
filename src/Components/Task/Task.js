import React, { useEffect, useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
export default function Task(props) {
  const localhost = "http://localhost:3000";
  const herokuhost = "https://hk7webadvmidtermserver.herokuapp.com";
  const accessToken = localStorage.getItem("accessToken");
  const [editTaskModalHide, setEditTaskModalHide] = useState(false);
  const [deleteTaskModalHide, setDeleteTaskModalHide] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [showTask, setShowTask] = useState(true);
  const requestEditTask = async () => {
    const response = await fetch(herokuhost + "/tasks/update", {
      method: "POST",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        taskId: props.taskItem.commentId,
        newTaskName: newTaskName,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      props.taskItem.content = newTaskName;
      alert(data.message);
      setEditTaskModalHide(false);
    }
  };
  const requestDeleteTask = async () => {
    const response = await fetch(herokuhost + "/tasks/delete", {
      method: "POST",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        taskId: props.taskItem.commentId,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      props.taskItem.isDeleted = 1;
      hideDeletedTask();
      alert(data.message);
    }
  };
  const hideDeletedTask = () => {
    if (props.taskItem.isDeleted === 1) setShowTask(!showTask);
  };
  const handleDeleteTask = () => {
    requestDeleteTask();
    setDeleteTaskModalHide(true);
  };
  useEffect(() => {}, []);
  return (
    <>
      {showTask && (
        <div className="card" style={{}}>
          <div className="card-body">
            <p className="card-text">{props.taskItem.content}</p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-success"
              onClick={() => setEditTaskModalHide(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: "1rem" }}
              onClick={() => setDeleteTaskModalHide(true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div>
            {/* edit modal */}
            <Modal
              show={editTaskModalHide}
              onHide={() => setEditTaskModalHide(false)}
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
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    required
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-primary float-left"
                  onClick={() => requestEditTask()}
                >
                  Xác nhận
                </button>
              </Modal.Footer>
            </Modal>
            {/* Delete Modal */}
            <Modal
              show={deleteTaskModalHide}
              onHide={() => setDeleteTaskModalHide(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Xóa thẻ
                </Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <button
                  className="btn btn-danger float-left"
                  onClick={() => handleDeleteTask()}
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
