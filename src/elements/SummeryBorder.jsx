import React from "react";
import { Summery } from "../constant";

const SummeryBorder = (props) => {
  return (
    <React.Fragment>
      <div className="border-container">
        <div style={{ color: "#fff" }}>
          <Summery />
        </div>
        <div className="summery-title">{`${props.summery} Summery`}</div>
      </div>
    </React.Fragment>
  );
};

export default SummeryBorder;
