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
          <h1 id={"InstructionStyle"}>Instructions:</h1>
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
              height: 150,
              position: "absolute",
              right: "55px",
              top: "500px",
            }}
          />
        </div>
    );
}




  export default SideInstructions;