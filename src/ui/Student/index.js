import React from "react";
import "./Student.scss";
import HeaderBar from "../../components/HeaderBar";
import Home from "./Page/Home";
import CourseRegistration from "./Page/CourseRegistration/";
import Timetable from "./Page/Timetable/";

import { Route } from "react-router-dom";

const Student = ({ match }) => {
  console.log(match.path);
  return (
    <div className="main-ui">
      <HeaderBar pathname={match.path} />

      <Route exact path={`${match.path}/`} component={Home} />
      <Route path={`${match.path}/courses`} component={CourseRegistration} />
      <Route path={`${match.path}/timetable`} component={Timetable} />
    </div>
  );
};

export default Student;
