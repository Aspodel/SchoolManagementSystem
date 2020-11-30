import React from "react";
import { Route } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";
import Home from "./Page/Home";
import Courses from "./Page/Courses/Test";
import Student from "./Page/Student";

const Admin = ({ match }) => {
  return (
    <div className="admin">
      <HeaderBar pathname={match.path} />

      <Route exact path={`${match.path}/`} component={Home} />

      <Route exact path={`${match.path}/courses`} component={Courses} />

      <Route exact path={`${match.path}/students`} component={Student} />
    </div>
  );
};

export default Admin;
