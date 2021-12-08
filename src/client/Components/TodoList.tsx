import { faCheck, faShoePrints } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TodoList = ({text, setActiveList, setCounter, counter}) => {
    return (
        <p><FontAwesomeIcon icon={faShoePrints} id={"CursorChange"}
        onClick={() => {
            setActiveList(text)
            setCounter(counter +1)
        } }/> {text}</p>
    );
}

export default TodoList;