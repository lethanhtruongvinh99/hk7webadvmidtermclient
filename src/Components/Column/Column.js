import React, { useState, useEffect } from "react";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import ListTask from "../ListTask/ListTask";
function Column(props) {
  const localhost = "http://localhost:3000";
  const herokuhost = "https://hk7webadvmidtermserver.herokuapp.com";
  const accessToken = localStorage.getItem("accessToken");
  const [editColumnModalHide, setEditColumnModalHide] = useState(false);
  const [deleteColumnModalHide, setDeleteColumnModalHide] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [showColumn, setShowColumn] = useState(true);
  useEffect(() => {}, []);
  const handleDeleteColumn = () => {
    requestDeleteColumn();
    setDeleteColumnModalHide(false);
  };
  const hideDeleteColumn = () => {
    if (props.ColumnItem.isDeleted === 1) {
      setShowColumn(!showColumn);
    }
  };
  const requestEditColumn = async () => {
    const response = await fetch(herokuhost + "/columns/update", {
      method: "POST",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        taskId: props.ColumnItem.taskId,
        newcolumnName: newColumnName,
      }),
    });
    if (response.status === 200) {
      const dataRes = await response.json();
      alert(dataRes.message);
      props.ColumnItem.taskName = newColumnName;
      setEditColumnModalHide(false);
    } else {
      const dataRes = await response.json();
      alert(dataRes.message);
    }
  };
  const requestDeleteColumn = async () => {
    const response = await fetch(herokuhost + "/columns/delete", {
      method: "POST",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        taskId: props.ColumnItem.taskId,
      }),
    });
    if (response.status === 200) {
      const dataRes = await response.json();
      alert(dataRes.message);
      props.ColumnItem.isDeleted = 1;
      hideDeleteColumn();
      setEditColumnModalHide(false);
    } else {
      const dataRes = await response.json();
      alert(dataRes.message);
    }
  };
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      {showColumn && (
        <div className="col md-4">
          <div className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-6">
              <h5> {props.ColumnItem.taskName}</h5>
            </div>
            <div className="col-3">
              <button
                className="btn btn-dark"
                style={{ marginLeft: "50%" }}
                onClick={() => setEditColumnModalHide(true)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
            <div className="col-3">
              <button
                className="btn btn-dark"
                style={{ marginLeft: "20px" }}
                onClick={() => setDeleteColumnModalHide(true)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
          <ListTask ColumnId={props.ColumnItem.taskId} />
        </div>
      )}
      <div>
        {/* edit Modal  */}
        <Modal
          show={editColumnModalHide}
          onHide={() => setEditColumnModalHide(false)}
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
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary float-left"
              onClick={() => requestEditColumn()}
            >
              Xác nhận
            </button>
          </Modal.Footer>
        </Modal>
        {/* Delete Modal */}
        <Modal
          show={deleteColumnModalHide}
          onHide={() => setDeleteColumnModalHide(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Xóa cột
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <button
              className="btn btn-danger float-left"
              onClick={() => handleDeleteColumn()}
            >
              Xác nhận
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
}
export default Column;
