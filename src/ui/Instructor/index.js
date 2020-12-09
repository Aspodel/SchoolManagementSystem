import React from "react";
import { Route } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";
import Home from "./Page/Home";
import Timetable from "./Page/Timetable";
import Courses from "./Page/Courses";

const Instructor = ({ match }) => {
  return (
    <div className="instructor-ui">
      <HeaderBar pathname={match.path} />

      <Route exact path={`${match.path}/`} component={Home} />

      <Route exact path={`${match.path}/timetable`} component={Timetable} />

      <Route exact path={`${match.path}/courses`} component={Courses} />
    </div>
  );
};

export default Instructor;
