import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
function BoardItem(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{props.BoardItem.boardName}</Card.Title>
        <Card.Text>{props.BoardItem.userId}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BoardItem;
