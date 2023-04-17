import React from "react";
import avatar from "../assets/img/avatar.png";

const Avatar = (props) => {
  return (
    <figure className="avatar-container">
      <img src={props.avatar || avatar} alt="avatar" />
    </figure>
  );
};

export default Avatar;
