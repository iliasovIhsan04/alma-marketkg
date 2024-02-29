import React from "react";
import "./Modal2.css";
import close from "../../img/soon-alma-close.svg";

const Modal2 = ({ setModal, children }) => {
  return (
    <div className="modal_bek_two">
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

export default Modal2;
