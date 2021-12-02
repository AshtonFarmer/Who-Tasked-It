import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Task = ({id, taskText, toDoListItemClicked}) => {
    return (
        <p><FontAwesomeIcon icon={faCheck} style={{cursor: "pointer"}}
        onClick={() => toDoListItemClicked(id)}/> {taskText}</p>
    );
}

export default Task;