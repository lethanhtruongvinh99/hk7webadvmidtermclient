import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./style.css";
function BoardItem(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.BoardItem.boardName}</h5>
        <p className="card-text">{props.BoardItem.userId}</p>
        <a href="#" className="btn btn-primary">
          Xem
        </a>
      </div>
    </div>
  );
}

export default BoardItem;
