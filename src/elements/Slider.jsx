import React from "react";

const Slider = (props) => {
  return (
    <aside
      className="slider-container"
      data-show={props.showMenuItem ? "show" : "hide"}
      onClick={props.handleHamburgerClick}
    >
      {props.children}
    </aside>
  );
};

export default Slider;
