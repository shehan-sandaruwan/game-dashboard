import React from "react";
import { Delete, Plus } from "../constant";

const ActionComponent = ({ rowItem, onEditItem }) => {
  return (
    <React.Fragment>
      <div className="action-container">
        <button
          className="plus-btn"
          onClick={() => onEditItem("edit", rowItem)}
        >
          <Plus />
          <span>Edit</span>
        </button>
        <button
          className="delete-btn"
          onClick={() => onEditItem("delete", rowItem)}
        >
          <Delete />
          <span>Delete</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default ActionComponent;
