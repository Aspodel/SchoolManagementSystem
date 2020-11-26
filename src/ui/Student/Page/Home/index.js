import React from "react";
import "./Home.scss";
import TitleBar from "../../../../components/TitleBar";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <TitleBar title="Feature Board" />

      <div className="feature-bar">
        <Link to={`/student/timetable`}>
          <div className="card">
            <FiCalendar className="icon" />
            <span>View timetable</span>
          </div>
        </Link>

        <Link to={`/student/courses`}>
          <div className="card">
            <FiPlus className="icon" />
            <span>Course registration</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
