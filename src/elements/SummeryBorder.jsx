import React from "react";

const SummeryBorder = (props) => {
  return (
    <React.Fragment>
      <div className="border-container">
        <div style={{ color: "#fff" }}>{props.icon}</div>
        <div className="summery-title">{`${props.summery}`}</div>
      </div>
    </React.Fragment>
  );
};

export default SummeryBorder;
