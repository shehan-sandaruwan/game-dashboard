import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";

const ProgressbarItem = (props) => {
  return <ProgressBar completed={props.progress} />;
};

export default ProgressbarItem;
