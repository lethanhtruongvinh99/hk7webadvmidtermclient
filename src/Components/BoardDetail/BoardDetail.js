import React, { useEffect, useLayoutEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Task from "../Task/Task";

function BoardDetail(props){ 
    let url = useRouteMatch();
    return(
        <div className="container-fluid">
            <div className="row">
                <h1 className="bg-light text-primary text-center">Board Detail Of {url.params.boardId}</h1>
            </div>
            <div className="row">
                <div className="col md-4">
                    <p>BoardDetailCol1</p>
                    <button>+</button>
                    <Task />
                </div>
                <div className="col md-4">
                    <p>BoardDetailCol2</p>
                    <button>+</button>
                </div>
            </div>
            
        </div>
    )
}
export default BoardDetail;