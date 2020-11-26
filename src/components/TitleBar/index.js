import React from "react";
import "./TitleBar.scss";

import { AiFillStar } from "react-icons/ai";
import { FiEye } from "react-icons/fi";

const TitleBar = (props) => {
  return (
    <div className="title-bar">
      <AiFillStar className="symbol" />

      <div className="title">
        <span>
          <span>{props.title}</span>
          <div className="visible">
            <FiEye className="icon" />
            <span>Student Visible</span>
          </div>
        </span>
        <span>International University</span>
      </div>
    </div>
  );
};

export default TitleBar;
