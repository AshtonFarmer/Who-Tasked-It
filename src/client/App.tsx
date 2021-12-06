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
import Task from "./Components/Task";
import Services from "../server/Services";
import LoginModal from "./Components/loginModal";
import SideInstructions from "./Components/SideInstructions";
import TodoList from "./Components/TodoList";
// import TextModal from "./Components/TextModal";

function App() {
  const prevBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const book = useRef<HTMLDivElement>(null);

  const paper1 = useRef<HTMLDivElement>(null);
  const paper2 = useRef<HTMLDivElement>(null);
  const paper3 = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [TextisLoggedIn, setTextIsLoggedIn] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  // const [modalTextIsOpen, setTextIsOpen] = useState<boolean>(false);
  const [list, setList] = useState<string[]>([]);
  const [currentToDoListInput, setCurrentToDoListInput] = useState<string>("");
  const [currentState, setCurrentState] = useState<number>(1);
  const [activeList, setActiveList] = useState<string>("");
  const [savedLists, setSavedLists] = useState<string[]>([]);
  const [solution, setSolution] = useState<string[]>([]);
  const [counter, SetCounter] = useState<number>(0);
  const [blanks, setBlanks] = useState<string[]>([
    "_____",
    "_____",
    "_____",
    "_____",
    "_____",
    "_____",
    "_____",
    "_____",
    "_____"
  ]);

  const handleModalOpen = (val) => setIsOpen(val);
  // const handleTextModalOpen = (val) => setTextIsOpen(val);

  const handleLogin = (val) => setIsLoggedIn(val);
  // const handleTextLogin = (val) => setTextIsLoggedIn(val);

  let blankArray = blanks.map((val) => {
    return val;
  });
  let mystery = `A dark night loomed during the amateur lacrosse tournament at which ${blankArray[0]} was playing, deep within ${blankArray[1]}. 
  It was known that a certain artifact created by master artisan ${blankArray[2]}, ${blankArray[3]} would be on display in the ${blankArray[4]}.
  Bad omens prevailed on that night, however. ${blankArray[5]}, their heart full of jealousy, whipping out ${blankArray[6]}, slew the good patron ${blankArray[7]} 
  in an act of ice-cold blood! I discerned that ${blankArray[5]} was the criminal at hand by finding their hair on ${blankArray[8]}`;

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

  const storedLists = savedLists.map((val) => {
    return <TodoList text={val.list_name} setActiveList={setActiveList} setCounter={SetCounter} counter={counter}></TodoList>
  })

  useEffect(() => {
    let mounted = true;
    Services.getTasks(activeList).then((tasks) => {
      if (mounted) {
        setList(tasks);
      }
      return () => (mounted = false);
    });
  }, [counter]);

  useEffect(() => {
    setBlanks([...blanks]);
  }, [counter]);

  // May need to add a different counter here to prevent for calling on each render
  useEffect(() => {
    let mounted = true;
    Services.getLists().then(res =>{
      if (mounted){
        setSavedLists(res)
      }
      return () => (mounted = false);
    })
  }, [counter])

  useEffect(() => {
    let mysterySolution = getMysterySolution()
    mysterySolution.then(res => setSolution(res));
  }, [])

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

  function openLoginModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function saveToDoListInput() {
    setList([...list, currentToDoListInput]);
    let data = {
      content: currentToDoListInput,
      list_name: activeList
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

  const getMysterySolution = async () => {
    let result = await Services.getIntialClues();
    let finalResult = await Promise.all(result);
    console.log(finalResult);
    return finalResult
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
    let random = (Math.round(Math.random() * (solution.length - 1)));
    if (random == 0){
      blanks.splice(0, 1, Object(solution[0]));
    }
    if (random == 1){
      blanks.splice(1, 1, Object(solution[1]));
    }
    if (random == 2){
      blanks.splice(2, 1, Object(solution[2]));
    }
    if (random == 3){
      blanks.splice(3, 1, Object(solution[3]));
    }
    if (random == 4){
      blanks.splice(4, 1, Object(solution[4]));
    }
    if (random == 5){
      blanks.splice(5, 1, Object(solution[5]));
      blanks.splice(8, 1, Object(solution[8]));
    }
    if (random == 6){
      blanks.splice(6, 1, Object(solution[6]));
    }
    if (random == 7){
      blanks.splice(7, 1, Object(solution[7]));
    }
    if (random == 8){
      blanks.splice(9, 1, Object(solution[9]));
    }
    SetCounter(counter + 1);
    //SetClues([...clues, await Services.getClue()]);
  }

  function handleCreateTodoList(){
    let data = {
      list_name: activeList,
      user_id: 1
    }
    console.log(data);
    Services.createTodoList(data)
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
                  <h1 className={"m-0 book-title"} style={{fontWeight: "bolder"}}>Who Task'd It?</h1>
                  <img id={"Cluebanner"} src="title.jpg" />
                  {!isLoggedIn && (

                    <button id={"CursorChange"}
                      onClick={openLoginModal}

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
                    <div className={"content"} style={{fontWeight: "bolder"}} >
                      <h1 style={{fontWeight: "bolder"}}>Saved To-Do lists:</h1>
                      <ul>{storedLists}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="p2" ref={paper2} className={"paper"}>
              <div className={"front"}>
                <div id={"Suspect"} className="container">
                  <div id="f2" className={"front-content"}></div>
                  <h1 id={"f2"} style={{fontWeight: "bolder"}}>Solved Mysteries</h1>
                  <p>{mystery}</p>
                </div>
              </div>
              <div className={"back"}>
                <div id="b2" className={"back-content"}>
                  <div id={"Todo"} className="container">
                    <div className="content">

                    <h2 id={"TodoH2"} style={{fontWeight: "bolder"}}>Create a To-Do List:</h2>
                    <input
                      type="text"
                      placeholder="enter list title"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setActiveList(e.target.value);
                      }}
                      value={activeList}
                    ></input>
                    <button type="submit" onClick={handleCreateTodoList}>
                      Create List
                    </button>
                    <input
                      className={"InputTodo"}
                      id={"CursorChange"}
                      type="text"
                      placeholder="enter task"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setCurrentToDoListInput(e.target.value);
                      }}
                      value={currentToDoListInput}
                    ></input>
                    <button className={"BtnTodo"}
                      id={"CursorChange"}
                      type="submit"
                      onClick={saveToDoListInput}
                    >
                      add
                    </button>


                    <h4 id={"TodoH4"} style={{fontWeight: "bolder"}}>Click checkmark to finish a task and get a clue!</h4>

                    <h4>{TaskList}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="p3" ref={paper3} className={"paper"}>
              <div className={"front"}>
                <div id="f3" className={"front-content"}>
                  <div className={"content"}>
                    <h1 style={{fontWeight: "bolder"}}>Clues</h1>
                    <p>{mystery}</p>
                  </div>
                </div>
              </div>
              <div className={"back"}>
                <div id="b3" className={"back-content"}>
                    <h1 style={{
                      position: "relative",
    top: 13, fontWeight: "bolder"}}>Credits:</h1>

                    <a id={"CursorChange"} href={"https://github.com/david90937"}>
                    <img style={{
                      position: "relative",
                      top: 48, left: -145
                    }} src="github.png" />
                    </a>
                    <h2 style={{
                      position: "relative",
    top: 17, right: -20, fontWeight: "bolder"}}>DAVID - back end development</h2>

                    <a id={"CursorChange"} href={"https://github.com/Zomievey"}>
                    <img style={{
                      position: "relative",
                      top: 26,
                      right: 158,
                    }} src="github.png" />
                    </a>
                    <h2 style={{
                      position:"relative",
                      top: -5,
                      right: -12, fontWeight: "bolder"}}>HAYLEE - front end development</h2>
                    <a id={"CursorChange"} href={"https://github.com/ashtonfarmer"}>
                    <img style={{position: "relative",
    top: 10,
    right: 170 }}src="github.png" />
                    </a>
                    <h2 style={{
                     right: -6,
                     position: "relative",
                     top: -21, fontWeight: "bolder"}}>ASHTON - front end development</h2>
                    <a id={"CursorChange"} href={"https://github.com/dmcleg"}>
                    <img style={{position: "relative",
    top: -7,
    right: 110}}src="github.png" />
                    </a>
                    <h2 style={{
                    right: -36,
                    position: "relative",
                    top: -38, fontWeight: "bolder"}}>DREW - UX/UI development</h2>
                   <img id={"backbanner"} src="map.jfif" />
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
