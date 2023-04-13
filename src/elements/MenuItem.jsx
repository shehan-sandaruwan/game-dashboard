import React from "react";
import PropTypes from "prop-types";

const MenuItem = (props) => {
  return (
    <React.Fragment>
      <li
        className={`menuite-container ${props.isActive ? "active" : ""}`}
        onClick={() => props.onClickHandler(props.id)}
      >
        <div
          className="menu-icon"
          style={{ color: props.isActive ? "#1a1c23" : "#707275" }}
        >
          {props.icon}
        </div>
        <div className="menu-displayName">{props.displayName}</div>
      </li>
    </React.Fragment>
  );
};

export default MenuItem;
