import React from "react";
import TitleBar from "../../../../components/TitleBar";
import { FiBookOpen, FiBriefcase, FiUsers } from "react-icons/fi";
import { VscMortarBoard } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <TitleBar title="Feature Board" />

      <div className="feature-bar">
        <Link to={`/admin/courses`}>
          <div className="card">
            <FiBookOpen className="icon" />
            <span>Courses</span>
          </div>
        </Link>

        <Link to={`/admin/students`}>
          <div className="card">
            <VscMortarBoard className="icon" />
            <span>Student</span>
          </div>
        </Link>

        <Link to={`/admin/instructors`}>
          <div className="card">
            <FiUsers className="icon" />
            <span>Instructor</span>
          </div>
        </Link>

        <Link to={`/admin/departments`}>
          <div className="card">
            <FiBriefcase className="icon" />
            <span>Department</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
