import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Task from "./Components/Task";
import Services from "../server/Services";
import LoginModal from "./Components/loginModal";
import SideInstructions from "./Components/SideInstructions";
import TodoList from "./Components/TodoList";
import { AutomaticPrefetchPlugin, container } from "webpack";

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

  const [mystery, setMystery] = useState<string[]>([]);
  const [sentenceCount, setSentenceCount] = useState<number>(-1);

  const handleModalOpen = (val) => setIsOpen(val);
  // const handleTextModalOpen = (val) => setTextIsOpen(val);

  const handleLogin = (val) => setIsLoggedIn(val);
  // const handleTextLogin = (val) => setTextIsLoggedIn(val);
  let sentences = [`A dark night loomed during the amateur lacrosse tournament at which ${solution[0]} was playing, deep within ${solution[1]}.`, 
  `It was known that a certain artifact created by master artisan ${solution[2]}, ${solution[3]} would be on display in the ${solution[4]}.`,
  `Bad omens prevailed on that night, however. ${solution[5]}, their heart full of jealousy, whipping out ${solution[6]}, slew the good patron ${solution[7]} 
  in an act of ice-cold blood!`, `I discerned that ${solution[5]} was the criminal at hand by finding their hair on ${solution[8]}`];

  // let blankArray = blanks.map((val) => {
  //   return val;
  // });
  useEffect(() => {
    if (sentenceCount >= 0){
      setMystery([...mystery, sentences[sentenceCount]]);
    }
    if (sentenceCount >= sentences.length){
      return;
    }
  }, [sentenceCount])


  let mystery1 = `It was breakfast as usual at Visionary Philosopher 'Crybaby' the Class Clown's fiftieth birthday on the top floor of the mysterious seltzer water factory. Gathering there...`;
  let mystery2 = `The first breath of autumn blew over the Antiquated local burger joint that Evil Incarnate, 'Loverboy' the Jeopardy champion loved so much. Unbeknownst to mortal eyes, the invisible... `;
  let mystery3 = `Centuries ago, chaos reigned over Viscount 'Four Eyes' Petrov's obsessive PC gaming hobby, far up at the Enigmatic casino. Beneath layers of sediment, a lone golem, Takashi...`;

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
    return (
      <TodoList
        text={val.list_name}
        setActiveList={setActiveList}
        setCounter={SetCounter}
        counter={counter}
      ></TodoList>
    );
  });

  useEffect(() => {
    let mounted = true;
    Services.getTasks(activeList).then((tasks) => {
      if (mounted) {
        setList(tasks);
      }
      return () => (mounted = false);
    });
  }, [counter]);

  // May need to add a different counter here to prevent for calling on each render
  useEffect(() => {
    let mounted = true;
    Services.getLists().then((res) => {
      if (mounted) {
        setSavedLists(res);
      }
      return () => (mounted = false);
    });
  }, [counter]);

  useEffect(() => {
    let mysterySolution = getMysterySolution();
    mysterySolution.then((res) => setSolution(res));
  }, []);

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
    handleCreateTodoList();
    setList([...list, currentToDoListInput]);
    let data = {
      content: currentToDoListInput,
      list_name: activeList,
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
    return finalResult;
  };

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

  async function toDoListItemClicked(id: number) {
    Services.DeleteTask(id);
    setSentenceCount(sentenceCount +1);
    SetCounter(counter + 1);
  }

  function handleCreateTodoList() {
    let data = {
      list_name: activeList,
      user_id: 1,
    };
    console.log(data);
    Services.createTodoList(data);
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
                  <h1
                    className={"m-0 book-title"}
                    style={{ fontWeight: "bolder" }}
                  >
                    Who Task'd It?
                  </h1>
                  <img id={"Cluebanner"} src="title.jpg" />
                  {!isLoggedIn && (
                    <button
                      id={"CursorChange"}
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
                    <div className={"content"} style={{ fontWeight: "bolder" }}>
                      <h1 style={{ fontWeight: "bolder" }}>
                        Saved To-Do lists:
                      </h1>
                      <ul id={"storedlists"}>{storedLists}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="p2" ref={paper2} className={"paper"}>
              <div className={"front"}>
                <div id={"Suspect"} className="container">
                  <div id="f2" className={"front-content"}></div>
                  <h1 id={"f2"} style={{ fontWeight: "bolder" }}>
                    Solved Mysteries
                  </h1>
                  <div id={"DropMystery"} className={"container"}>
                    <div
                      style={{
                        position: "relative",
                        bottom: -74,
                      }}
                      className="dropdown"
                    >
                      <button className="dropbtn">Mystery 1</button>
                      <div className="dropdown-content">
                        <p>{mystery1}</p>
                      </div>
                    </div>
                    <div
                      style={{ right: -12, position: "relative", bottom: -74 }}
                      className="dropdown"
                    >
                      <button className="dropbtn">Mystery 2</button>
                      <div className="dropdown-content">
                        <p>{mystery2}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        right: -23,
                        position: "relative",
                        bottom: -74,
                      }}
                      className="dropdown"
                    >
                      <button className="dropbtn">Mystery 3</button>
                      <div className="dropdown-content">
                        <p>{mystery3}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"back"}>
                <div id="b2" className={"back-content"}>
                  <div id={"Todo"} className="container">
                    <div className="content">
                      <h2 id={"TodoH2"} style={{ fontWeight: "bolder" }}>
                        Create a To-Do List:
                      </h2>
                      <input
                        style={{ position: "relative", left: 33 }}
                        className={"InputTodo"}
                        id={"CursorChange"}
                        type="text"
                        placeholder="Enter List Title"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setActiveList(e.target.value);
                        }}
                        value={activeList}
                      ></input>
                      {/* <button type="submit" onClick={handleCreateTodoList}>
                        Save
                      </button> */}
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
                      <button
                        className={"BtnTodo"}
                        id={"CursorChange"}
                        type="submit"
                        onClick={saveToDoListInput}
                      >
                        add
                      </button>

                      <h4 id={"TodoH4"} style={{ fontWeight: "bolder" }}>
                        Click checkmark to finish a task and get a clue!
                      </h4>

                      <div id={"scroll"}>{TaskList}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="p3" ref={paper3} className={"paper"}>
              <div className={"front"}>
                <div id="f3" className={"front-content"}>
                  <div className={"content"}>
                    <h1
                      style={{
                        top: -29,
                        position: "relative",
                        fontWeight: "bolder",
                        right: -168,
                      }}
                    >
                      Clues
                    </h1>
                    <p id={"Clue"}>{mystery}</p>
                  </div>
                </div>
              </div>
              <div className={"back"}>
                <div id="b3" className={"back-content"}>
                  <h1
                    style={{
                      position: "relative",
                      top: 13,
                      fontWeight: "bolder",
                    }}
                  >
                    Credits:
                  </h1>

                  <a id={"CursorChange"} href={"https://github.com/david90937"}>
                    <img
                      style={{
                        position: "relative",
                        top: 48,
                        left: -145,
                      }}
                      src="github.png"
                    />
                  </a>
                  <h2
                    style={{
                      position: "relative",
                      top: 17,
                      right: -20,
                      fontWeight: "bolder",
                    }}
                  >
                    DAVID - back end development
                  </h2>

                  <a id={"CursorChange"} href={"https://github.com/Zomievey"}>
                    <img
                      style={{
                        position: "relative",
                        top: 26,
                        right: 158,
                      }}
                      src="github.png"
                    />
                  </a>
                  <h2
                    style={{
                      position: "relative",
                      top: -5,
                      right: -12,
                      fontWeight: "bolder",
                    }}
                  >
                    HAYLEE - front end development
                  </h2>
                  <a
                    id={"CursorChange"}
                    href={"https://github.com/ashtonfarmer"}
                  >
                    <img
                      style={{ position: "relative", top: 10, right: 170 }}
                      src="github.png"
                    />
                  </a>
                  <h2
                    style={{
                      right: -6,
                      position: "relative",
                      top: -21,
                      fontWeight: "bolder",
                    }}
                  >
                    ASHTON - front end development
                  </h2>
                  <a id={"CursorChange"} href={"https://github.com/dmcleg"}>
                    <img
                      style={{ position: "relative", top: -7, right: 110 }}
                      src="github.png"
                    />
                  </a>
                  <h2
                    style={{
                      right: -36,
                      position: "relative",
                      top: -38,
                      fontWeight: "bolder",
                    }}
                  >
                    DREW - UX/UI development
                  </h2>
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
