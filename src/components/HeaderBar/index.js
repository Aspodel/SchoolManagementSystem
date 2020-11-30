import React, { Fragment } from "react";
import "./HeaderBar.scss";
import { FiBell, FiChevronLeft, FiGrid, FiSearch } from "react-icons/fi";
import avatar from "../../image/avatar.jpg";
import { Link, useHistory } from "react-router-dom";

const HeaderBar = (props) => {
  const { pathname } = props;
  let history = useHistory();
  //   console.log(window.location.pathname);
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
            /* to={pathname} */ onClick={() => history.goBack()}
            className="only"
          >
            <FiChevronLeft className="only-icon" />
          </Link>
        )}
      </div>

      <div className="center">College Database</div>

      <div className="right">
        <img src={avatar} alt="" />
        <span>Hello, Daddy</span>
        <FiBell className="icon" />
      </div>
    </div>
  );
};

export default HeaderBar;
