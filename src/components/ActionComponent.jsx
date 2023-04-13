import React from "react";
import { Delete, Plus } from "../constant";

const ActionComponent = () => {
  return (
    <React.Fragment>
      <div className="action-container">
        <button className="plus-btn">
          <Plus />
          <span>Edit</span>
        </button>
        <button className="delete-btn">
          <Delete />
          <span>Delete</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default ActionComponent;
