import React from "react";
import SummeryBorder from "./SummeryBorder";
import { Close } from "../constant";

const Modal = (props) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div onClick={props.handleModalClose} className="close-btn">
          <Close />
        </div>
        <SummeryBorder summery={props.selectedMenuItem} />
        <div>{props.children}</div>
        <div className="modal-footer">
          <hr></hr>
          <button>{props.action || "Add"}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
