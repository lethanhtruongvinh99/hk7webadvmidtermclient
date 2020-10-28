import React from "react";
import BoardItem from "../BoardItem/BoardItem";
function BoardList(props) {
  return (
    <>
      {props.ListItem.map((item) => (
        <BoardItem key={item.boardId} BoardItem={item} />
      ))}
    </>
  );
}

export default BoardList;
