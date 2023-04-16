import React from "react";
import SummeryBorder from "./SummeryBorder";
import { Close, Warning } from "../constant";

const Modal = (props) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div onClick={props.handleModalClose} className="close-btn">
          <Close />
        </div>
        <SummeryBorder summery={props.selectedMenuItem} icon={props.icon} />
        {props.action === "delete" && (
          <div className="delete-warning">
            <Warning />
            <span>Are you Sure You want to delete this Item ?</span>
          </div>
        )}
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
