import React from "react";
import { Route } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";
import Home from "./Page/Home";
import Courses from "./Page/Courses";
import Student from "./Page/Student";
import Instructor from "./Page/Instructor";

const Admin = ({ match }) => {
  return (
    <div className="admin-ui">
      <HeaderBar pathname={match.path} />

      <Route exact path={`${match.path}/`} component={Home} />

      <Route path={`${match.path}/courses`} component={Courses} />

      <Route path={`${match.path}/students`} component={Student} />

      <Route path={`${match.path}/instructors`} component={Instructor} />
    </div>
  );
};

export default Admin;
