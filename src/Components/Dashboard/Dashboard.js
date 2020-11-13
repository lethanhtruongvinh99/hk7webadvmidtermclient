import React, { useState } from "react";
import BoardList from "../BoardList/BoardList";
import "./style.css";
import Header from "../Header/Header";
function Dashboard(props) {
  const [isModalHide, setIsModalHide] = useState(false);
  const [boardName, setBoardName] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    props.history.push("/");
  };
  const handleAddBoard = () => {
    setIsModalHide(!isModalHide);
  };
  const handleAddBoardBtn = () => {
    alert(boardName);
  }
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <h1 className="float-left">My Boards</h1>
        </div>
        <div className="row">
          <p>User Id: {localStorage.getItem("accessToken")}</p>
        </div>
        <div className="row">
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
