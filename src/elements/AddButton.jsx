import React from "react";
import { Plus } from "../constant";

const AddButton = ({ handleAddItem, selectedMenuItem }) => {
  return (
    <button className="add-btn" onClick={() => handleAddItem(selectedMenuItem)}>
      <div className="add-btn-content">
        <span>{`Add ${selectedMenuItem}`}</span>
        <Plus />
      </div>
    </button>
  );
};

export default AddButton;
