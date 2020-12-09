import React from "react";
import TitleBar from "../../../../components/TitleBar";
// import { FiCalendar, FiPlus } from "react-icons/fi";
import { FaClipboardList, FaGraduationCap, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <TitleBar title="Feature Board" />

      <div className="feature-bar">
        <Link to={`/admin/courses`}>
          <div className="card">
            <FaClipboardList className="icon" />
            <span>Courses</span>
          </div>
        </Link>

        <Link to={`/admin/students`}>
          <div className="card">
            <FaGraduationCap className="icon" />
            <span>Student</span>
          </div>
        </Link>

        <Link to={`/admin/instructors`}>
          <div className="card">
            <FaUser className="icon" />
            <span>Instructor</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
