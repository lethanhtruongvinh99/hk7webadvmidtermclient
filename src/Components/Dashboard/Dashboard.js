import React, { useState } from "react";
import BoardList from "../BoardList/BoardList";
import { FontAwesomeIcon } from "@fortawesome/fontawesome-free";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import "./style.css";
function Dashboard(props) {
  const [isModalHide, setIsModalHide] = useState(false);
  const [boardName, setBoardName] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("userId");
    props.history.push("/login");
  };
  const handleAddBoard = () => {
    setIsModalHide(!isModalHide);
  };
  const handleAddBoardBtn = () => {
    alert(boardName);
  }
  return (
    <div>
      Welcome User! <br />
      <input type="button" onClick={handleLogout} value="Logout"></input>
      <div className="container-fluid">
        <div className="row">
          <h1 className="float-left">My Boards</h1>
        </div>
        <div className="row">
          <p>User Id: {localStorage.getItem("userId")}</p>
        </div>
        <div className="row">
          {/* <div
            className="card"
            style={{ width: "10rem" }}
            onClick={() => setIsModalHide(true)}
          >
            <div className="card-body">
              <small style={{ margin: "auto" }}>Add</small>
            </div>
          </div> */}
          <BoardList />
        </div>
        {/* <Modal
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
            <button className="btn btn-primary float-left" onClick={handleAddBoardBtn}>Confirm</button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </div>
  );
}
export default Dashboard;
