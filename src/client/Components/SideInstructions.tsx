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
          <p>1. Create a To-Do List!</p>
          <p>2. Check off items on your to-do list to get Clues!</p>
          <p>3. Once a to-do list is completed, save your Solved Mystery!</p>
          <p>4. Go to Saved lists to start a new Adventure!</p>
          <p>Have Fun!</p>
          </div>
          <img id={"mag"}
            src="glass.png"
          style={{
              width: 150,
              height: 160,
              position: "absolute",
              right: "8px",
              top: "504px",
            }}
          />
        </div>
    );
}




  export default SideInstructions;