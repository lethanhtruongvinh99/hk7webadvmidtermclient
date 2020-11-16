import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import { Modal } from "react-bootstrap";
function ListTask(props) {
  const localhost = "http://localhost:3000";
  const herokuhost = "https://hk7webadvmidtermserver.herokuapp.com";
  const accessToken = localStorage.getItem("accessToken");
  const [isModalHide, setIsModalHide] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [data, setData] = useState([]);
  const requestAddTask = async () => {
    const response = await fetch(herokuhost + "/tasks/add", {
      method: "POST",
      headers: {
        authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({ content: newTaskName, columnId: props.ColumnId }),
    });
    if (response.status === 200) {
      const dataRes = await response.json();
      console.log(dataRes);
      alert(dataRes.message);
      setNewTaskName("");
      setData(data.concat(dataRes.data));
      setIsModalHide(false);
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };
  const requestAllTask = async () => {
    const response = await fetch(herokuhost + "/tasks/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ columnId: props.ColumnId }),
    });
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    requestAllTask();
  }, []);
  return (
    <div>
      {/* <p>{props.ColumnId}</p> */}
      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={() => {
          setIsModalHide(true);
        }}
      >
        +
      </button>
      {data.map((item) => (
        <Task key={item.commentId} taskItem={item} />
      ))}
      <Modal
        show={isModalHide}
        onHide={() => setIsModalHide(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Thêm thẻ mới
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Tên thẻ</label>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary float-left"
            onClick={requestAddTask}
          >
            Xác nhận
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ListTask;
