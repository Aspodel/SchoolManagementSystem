import React, { Fragment, useEffect, useState } from "react";
import "./HeaderBar.scss";
import {
  FiBell,
  FiChevronLeft,
  FiGrid,
  FiLogOut,
  FiSearch,
} from "react-icons/fi";
import teacher from "../../image/teacher.png";
import admin from "../../image/admin.png";
import student from "../../image/student.png";
import { Link, useHistory } from "react-router-dom";
import { removeToken } from "../../api/manageToken";
import { get_user_infor } from "../../api";

const HeaderBar = (props) => {
  const { pathname } = props;
  const [data, setData] = useState();
  let history = useHistory();
  //   console.log(window.location.pathname);

  const log_out = () => {
    removeToken();
    history.push("/");
  };

  useEffect(() => {
    const getUserInfor = async () => {
      let result = await get_user_infor();
      setData(result.data);
    };

    getUserInfor();
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // });

  return (
    <div className="header-bar">
      <div className="left">
        {window.location.pathname === pathname ? (
          <Fragment>
            <FiGrid className="icon" />
            <span>Board</span>
            <div className="search">
              <FiSearch className="icon" />
              <input type="search" placeholder="Search" />
            </div>
          </Fragment>
        ) : (
          <Link
            /* to={pathname} */
            onClick={() => history.goBack()}
            className="only"
          >
            <FiChevronLeft className="only-icon" />
          </Link>
        )}
      </div>

      <div className="center">College Database</div>

      <div className="right">
        <img
          src={
            data && data.role === "admin"
              ? admin
              : data && data.role === "teacher"
              ? teacher
              : student
          }
          alt=""
        />
        <span>{data && data.fullName}</span>
        <FiBell className="icon" />

        <div className="drop-box">
          <div className="box-item">Profile</div>
          <div className="box-item">Setting</div>
          <hr />
          <div className="box-item" onClick={log_out}>
            <FiLogOut className="box-icon" />
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
