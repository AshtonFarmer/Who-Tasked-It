import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Clue from "./Components/Clue";
import Task from "./Components/Task";
import Services from "../server/Services";
import LoginModal from "./Components/loginModal";
import SideInstructions from "./Components/SideInstructions";

function App() {
  const prevBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const book = useRef<HTMLDivElement>(null);

  const paper1 = useRef<HTMLDivElement>(null);
  const paper2 = useRef<HTMLDivElement>(null);
  const paper3 = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [list, setList] = useState<string[]>([]);
  const [currentToDoListInput, setCurrentToDoListInput] = useState<string>("");
  const [currentState, setCurrentState] = useState<number>(1);
  const [counter, SetCounter] = useState<number>(0);
  const [clues, SetClues] = useState<string[]>([]);
  const [suspects, SetSuspects] = useState<string[]>([]);
  const [weapons, SetWeapons] = useState<string[]>([]);
  const [locations, SetLocations] = useState<string[]>([]);
  const [blanks, setBlanks] = useState<string[]>([
    "_____",
    "_____",
    "_____",
    "_____",
    "_____",
  ]);
  const handleModalOpen = (val) => setIsOpen(val);
  const handleLogin = (val) => setIsLoggedIn(val);

  let blankArray = blanks.map((val) => {
    return val;
  });
  let mystery = `Our mystery is awesome because ${blankArray[1]}`;

  // Typescript errors on task_content and val.id
  const TaskList = list.map((val) => {
    return (
      <Task
        taskText={val.task_content}
        id={val.id}
        toDoListItemClicked={toDoListItemClicked}
      ></Task>
    );
  });
  // // this is set using clues[index] because there are multiple types of clue each with a different property that corresponds to its text.
  // const ClueList = clues.map((val, index) => {
  //     return <Clue text={clues[index]}></Clue>
  // });

  const SuspectList = suspects.map((val, index) => {
    return <Clue text={suspects[index]}></Clue>;
  });
  const WeaponList = weapons.map((val, index) => {
    return <Clue text={weapons[index]}></Clue>;
  });
  const LocationList = locations.map((val, index) => {
    return <Clue text={locations[index]}></Clue>;
  });

  useEffect(() => {
    //logic for checking if user is logged in
    let mounted = true;
    Services.getTasks().then((tasks) => {
      if (mounted) {
        setList(tasks);
      }
      return () => (mounted = false);
    });
  }, [counter]);

  useEffect(() => {
    setBlanks([...blanks]);
  }, [counter]);

  // Business Logic
  let numOfPapers = 3;
  let maxState = numOfPapers + 1;

  function login(e: FormEvent) {
    e.preventDefault();
    //action for logging in
    //TODO: call backend and login
    setIsLoggedIn(true);
    closeModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function refreshPage() {
    window.location.reload();
  }

  function saveToDoListInput() {
    setList([...list, currentToDoListInput]);
    let data = {
      content: `${currentToDoListInput}`,
    };
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setCurrentToDoListInput("");
    SetCounter(counter + 1);
  }

  function openBook() {
    book.current!.style.transform = "translateX(50%)";
    prevBtn.current!.style.transform = "translateX(-180px)";
    nextBtn.current!.style.transform = "translateX(180px)";
  }

  function closeBook(isFirstPage: boolean) {
    if (isFirstPage) {
      book.current!.style.transform = "translateX(0%)";
    } else {
      book.current!.style.transform = "translateX(100%)";
    }
    prevBtn.current!.style.transform = "translateX(0px)";
    nextBtn.current!.style.transform = "translateX(0px)";
  }

  function goNext() {
    if (currentState < maxState) {
      switch (currentState) {
        case 1:
          openBook();
          paper1.current!.classList.add("flipped");
          paper1.current!.style.zIndex = "1";
          break;
        case 2:
          paper2.current!.classList.add("flipped");
          paper2.current!.style.zIndex = "2";
          break;
        case 3:
          closeBook(false);
          paper3.current!.classList.add("flipped");
          paper3.current!.style.zIndex = "3";
          break;
        default:
          throw new Error("unkown state");
      }
      //     if (currentState === maxState) {
      //         closeBook(true);
      //   }
      setCurrentState(currentState + 1);
    }
  }

  function goPrevious() {
    if (currentState > 1) {
      switch (currentState) {
        case 2:
          closeBook(true);
          paper1.current!.classList.remove("flipped");
          paper1.current!.style.zIndex = "3";
          break;
        case 3:
          paper2.current!.classList.remove("flipped");
          paper2.current!.style.zIndex = "2";
          break;
        case 4:
          openBook();
          paper3.current!.classList.remove("flipped");
          paper3.current!.style.zIndex = "1";
          break;
      }

      setCurrentState(currentState - 1);
    }
  }

  // The clues need to be changed to go into database so that they will persist across server refreshes. Not a top-priority.
  async function toDoListItemClicked(id: number) {
    Services.DeleteTask(id);
    let clue = await Services.getClue();
    if (clue[0] == "suspects") {
      SetSuspects([...suspects, clue[1]]);
      blanks.splice(1, 1, clue[1]);
    }
    if (clue[0] == "weapons") {
      SetWeapons([...weapons, clue[1]]);
      blanks.splice(1, 1, clue[1]);
    }
    if (clue[0] == "locations") {
      SetLocations([...locations, clue[1]]);
      blanks.splice(1, 1, clue[1]);
    }
    SetCounter(counter + 1);
    //SetClues([...clues, await Services.getClue()]);
  }

  return (
    <>
      <div className={"d-flex flex-row container-fluid"}>
        <div id={"background"} className={"container-fluid"}>
          {isLoggedIn && (
            <button
              id={"prev-btn"}
              className="col-1 navigation-button"
              ref={prevBtn}
              onClick={goPrevious}
            >
              <i className={"fas fa-arrow-circle-left"} />
            </button>
          )}

          <div id={"book"} className="book" ref={book}>
            <div id="p1" ref={paper1} className={"paper"}>
              <div className={"front"}>
                <div id="f1" className={"m-2 p-1 front-content"}>
                  <h1 className={"m-0 book-title"}>Who Task'd It?</h1>
                  <img id={"Cluebanner"} src="clueban.jpg" />
                  {!isLoggedIn && (
                    <button
                      onClick={openModal}
                      className={"btn btn-dark btn-lg"}
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
              <div className={"align-items-start back"}>
                <div id="b1" className={"back-content"}>
                  <div id={"Todo"} className="container">
                    <div className={"content"}>
                      <h2>Create a To-Do List:</h2>
                      <input
                        type="text"
                        placeholder="enter task"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setCurrentToDoListInput(e.target.value);
                        }}
                        value={currentToDoListInput}
                      ></input>
                      <button type="submit" onClick={saveToDoListInput}>
                        add
                      </button>

                      <h4>Click checkmark to finish a task and get a clue!</h4>
                      <h4>{TaskList}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="p2" ref={paper2} className={"paper"}>
              <div className={"front"}>
                <div id={"Suspect"} className="container">
                  <div id="f2" className={"front-content"}>
                    <h1>Suspect List</h1>
                    <ul>
                      <ul>{SuspectList}</ul>
                    </ul>
                    <h1>Clues</h1>
                    <div className={"row"}>
                      <div className={"col"}>
                        <h2>Weapons</h2>
                        <ul>{WeaponList}</ul>
                      </div>
                      <div className={"col"}>
                        <h2>Locations</h2>
                        <ul>{LocationList}</ul>
                        <button
                          className={"btn btn-lg btn-dark"}
                          style={{ position: "relative", right: "35px" }}
                        >
                          Solve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"back"}>
                <div id="b2" className={"back-content"}>
                  <h1>Saved To-Do lists:</h1>
                  <p>{mystery}</p>
                </div>
              </div>
            </div>
            <div id="p3" ref={paper3} className={"paper"}>
              <div className={"front"}>
                <div id="f3" className={"front-content"}>
                  <div className={"content"}>
                    <h1>Your Solved Mysteries:</h1>
                  </div>
                </div>
              </div>
              <div className={"back"}>
                <div id="b3" className={"back-content"}>
                  <h1>Credits:</h1>

                  <a href={"https://github.com/david90937"}>
                    <img src="github.png" />
                  </a>
                  <h2>DAVID - back end development</h2>

                  <a href={"https://github.com/Zomievey"}>
                    <img src="github.png" />
                  </a>
                  <h2>HAYLEE - front end development</h2>

                  <a href={"https://github.com/dmcleg"}>
                    <img src="github.png" />
                  </a>
                  <h2>DREW - UX/UI development</h2>

                  <a href={"https://github.com/ashtonfarmer"}>
                    <img src="github.png" />
                  </a>
                  <h2>ASHTON - front end development</h2>
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn && (
            <button
              id={"next-btn"}
              className="mr-0 col-1 navigation-button"
              ref={nextBtn}
              onClick={goNext}
            >
              <i className={"fas fa-arrow-circle-right"} />
            </button>
          )}
        </div>
        <SideInstructions />
      </div>
      <LoginModal
        isOpen={modalIsOpen}
        handleModalOpen={handleModalOpen}
        handleLogin={handleLogin}
      />
    </>
  );
}

export default App;
