import React from "react";
import { Plus } from "../constant";

const AddButton = (props) => {
  return (
    <button
      className="add-btn"
      onClick={() => props.handleAddItem(props.selectedMenuItem)}
    >
      <div className="add-btn-content">
        <span>{`Add ${props.selectedMenuItem}`}</span>
        <Plus />
      </div>
    </button>
  );
};

export default AddButton;
