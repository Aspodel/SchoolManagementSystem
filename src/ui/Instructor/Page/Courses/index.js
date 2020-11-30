import React from "react";
import { CourseList } from "../../../../api/fakeData";
import TitleBar from "../../../../components/TitleBar";
import "./Courses.scss";

import { FiChevronRight } from "react-icons/fi";
import { Link, Route, useRouteMatch } from "react-router-dom";

const Courses = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className="manage-courses">
      <TitleBar title="Manage Course" />

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Subject</th>
            <th>Day</th>
            <th>Start Period</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {CourseList.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.subject}</td>
              <td>{row.day}</td>
              <td>{row.startSlot}</td>
              <td>{row.rest + "/" + row.size}</td>
              <td>
                <Link>
                  <FiChevronRight className="icon" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Route path={`${path}/:subjectId`} />
    </div>
  );
};

export default Courses;
