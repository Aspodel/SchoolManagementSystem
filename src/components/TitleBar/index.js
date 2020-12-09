import React, { useEffect, useState } from "react";
import "./TitleBar.scss";

import { AiFillStar } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { get_user_infor } from "../../api";

const TitleBar = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const getUserInfor = async () => {
      let result = await get_user_infor();
      setData(result.data);
    };

    getUserInfor();
  }, []);
  return (
    <div className="title-bar">
      <AiFillStar className="symbol" />

      <div className="title">
        <span>
          <span>{props.title}</span>
          <div className="visible">
            <FiEye className="icon" />
            <span style={{ textTransform: "capitalize" }}>
              {data && data.role} Visible
            </span>
          </div>
        </span>
        <span>International University</span>
      </div>
    </div>
  );
};

export default TitleBar;
