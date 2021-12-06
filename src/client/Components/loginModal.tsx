import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "react-modal";

const LoginModal = ({ isOpen, handleModalOpen, handleLogin }) => {
  function login(e: FormEvent) {
    e.preventDefault();
    //action for logging in
    //TODO: call backend and login
    handleLogin(true);
    closeModal();
  }

  // function openLoginModal() {
  //   setIsOpen(true);
  // }

  function closeModal() {
    handleModalOpen(false);
  }

  return (
    <Modal
      className={"modalloginstyle"}
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      contentLabel="Example Modal"
    >
      <form style={{fontWeight: "bolder"}} className={"formstyle"}>
        <label htmlFor={"username"}style={{fontWeight: "bolder"}}>Username</label>
        <input id={"username"} type={"text"} />
        <div></div>
        <label htmlFor={"password"}style={{fontWeight: "bolder"}}> Password</label>
        <input id={"password"} type={"password"} />
        <button
          id={"btnform"}
          className={"btn btn-dark btn-lg"}
          onClick={login}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
