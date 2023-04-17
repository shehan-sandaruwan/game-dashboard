import React from "react";

const SummeryCard = (props) => {
  return (
    <React.Fragment>
      <div className="card-container">
        <div
          className="card-icon"
          style={{ color: props.color, backgroundColor: props.backgroundColor }}
        >
          {props.icon}
        </div>
        <div className="card-details">
          <div className="card-label">{props.title}</div>
          <div className="card-value">{props.value}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SummeryCard;
