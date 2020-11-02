import React from "react";
import BoardItem from "../BoardItem/BoardItem";
function BoardList(props) {
  return (
    <React.Fragment>
      {props.ListItem.map((item) => (
        <BoardItem key={item.boardId} BoardItem={item} />
      ))}
    </React.Fragment>
  );
}

export default BoardList;
