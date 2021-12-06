import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TodoList = ({text, setActiveList, setCounter, counter}) => {
    return (
        <p><FontAwesomeIcon icon={faCheck} style={{cursor: "pointer"}}
        onClick={() => {
            setActiveList(text)
            setCounter(counter +1)
        } }/> {text}</p>
    );
}

export default TodoList;