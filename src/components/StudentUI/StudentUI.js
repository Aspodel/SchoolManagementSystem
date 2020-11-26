import React from "react";
import "./StudentUI.scss";
import HeaderBar from "./Header/HeaderBar";
import Home from "./Page/Home/Home";
import CourseRegistration from "./Page/CourseRegistration/CourseRegistration";
import TimeTable from "./Page/TimeTable/TimeTable";

import { Route } from "react-router-dom";

const StudentUI = ({ match }) => {
  console.log(match.path);
  return (
    <div className="main-ui">
      <HeaderBar />

      <Route exact path={`${match.path}/`} component={Home} />
      <Route path={`${match.path}/courses`} component={CourseRegistration} />
      <Route path={`${match.path}/timetable`} component={TimeTable} />
    </div>
  );
};

export default StudentUI;
