import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComponent = (props) => {
  useEffect(() => {
    if (props.toastConfig.status === "success") {
      toast.success(props.toastConfig.message);
    } else if (props.toastConfig.status === "error") {
      toast.error(props.toastConfig.message);
    }
  }, [props.toastConfig]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
export default ToastComponent;
