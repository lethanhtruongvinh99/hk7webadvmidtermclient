import React from "react";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Column() {
  return (
    <div className="col md-4">
      <div className="row" style={{ marginBottom: "1rem" }}>
        <div className="col-6">
          <h5>BoardDetailCol1</h5>
        </div>
        <div className="col-3">
          <button className="btn btn-dark" style={{ marginLeft: "50%" }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-dark" style={{ marginLeft: "20px" }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>

      <button className="btn btn-primary btn-lg btn-block" onClick={() => {}}>
        +
      </button>
      <div className="card" style={{}}>
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Column;
