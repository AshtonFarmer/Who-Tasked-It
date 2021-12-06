import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
  } from "react";

  
  const SideInstructions = () => {

    return (
        <div className={"sidebar"}>
          <h1 id={"InstructionStyle"} style={{fontWeight: "bolder"}}>Instructions:</h1>
          <div id={"Numero"}>
          <p>1. Create a To-Do list!</p>
          <p>2. Complete tasks to reveal clues!</p>
          <p>3. Collect clues to solve the mystery!</p>
          <p>4. Attempt to solve as you</p>
          <p>complete your tasks!</p>
          </div>
          <img id={"mag"}
            src="glass.png"
          style={{
              width: 150,
              height: 160,
              position: "absolute",
              right: "50px",
              top: "485px",
            }}
          />
        </div>
    );
}




  export default SideInstructions;