import React from "react";
import { Link } from "react-router-dom";
import TitleBar from "../../../../components/TitleBar";
import { FiBookOpen, FiCalendar } from "react-icons/fi";


const Home = () => {
  return (
    <div className="home">
      <TitleBar title="Feature Board" />

      <div className="feature-bar">
        <Link to={`/instructor/courses`}>
          <div className="card">
            <FiBookOpen className="icon" />
            <span>Manage Courses</span>
          </div>
        </Link>

        <Link to={`/instructor/timetable`}>
          <div className="card">
            <FiCalendar className="icon" />
            <span>View Timetable</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
