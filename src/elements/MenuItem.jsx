import React from "react";
import PropTypes from "prop-types";

const MenuItem = ({ isActive, id, displayName, onClickHandler, icon }) => {
  return (
    <React.Fragment>
      <li
        className={`menuite-container ${isActive ? "active" : ""}`}
        onClick={() => onClickHandler(id)}
      >
        <div
          className="menu-icon"
          style={{ color: isActive ? "#1a1c23" : "#707275" }}
        >
          {icon}
        </div>
        <div className="menu-displayName">{displayName}</div>
      </li>
    </React.Fragment>
  );
};

MenuItem.propTypes = {
  isActive: PropTypes.bool,
  id: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

export default MenuItem;
