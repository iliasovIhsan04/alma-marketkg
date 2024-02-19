import React from "react";
import "./Modal.css";
import close from "../../img/close-modal.svg";

const Modal = ({ setModal, children }) => {
  return (
    <div className="modal_bek">
      <div onClick={() => setModal(false)} className="modal_bek_not"></div>
      <div className="modal_bek_container">
        <img
          onClick={() => setModal(false)}
          className="close"
          src={close}
          alt=""
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
