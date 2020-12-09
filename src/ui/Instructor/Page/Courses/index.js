import React, { useEffect, useState } from "react";
import TitleBar from "../../../../components/TitleBar";
import "./Courses.scss";

import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { get_courses_by_id, get_user_infor } from "../../../../api";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";
import { formatDate } from "../../../../utils/format";

const Courses = () => {
  // let { path } = useRouteMatch();
  const [courseList, setCourseList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const getUserInfor = async () => {
      const result = await get_user_infor();
      console.log(result.data);
      setCourseList(result.data.courses);
    };

    getUserInfor();
  }, []);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleClick = async (id) => {
    let result = await get_courses_by_id(id);
    console.log(result.data);
    setStudentList(result.data.students);
    setVisible(!visible);
  };

  return (
    <div className="manage-courses">
      <TitleBar title="Manage Course" />

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Subject</th>
            <th>Day</th>
            <th>Start</th>
            <th>Periods</th>
            <th>Room</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {courseList.map((row, index) => (
            <tr key={row.coursesId} onClick={() => handleClick(row.coursesId)}>
              <td>{index + 1}</td>
              <td>{row.coursesName}</td>
              <td>{weekdays[row.day - 1]}</td>
              <td>{row.startPeriod}</td>
              <td>{row.periods}</td>
              <td style={{ textTransform: "capitalize" }}>{row.room}</td>
              <td>{row.size - row.rest + "/" + row.size}</td>
              <td>
                <Link>
                  <FiChevronRight className="icon" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Route path={`${path}/:subjectId`} /> */}

      <Modal
        className="modal-box"
        visible={visible}
        onOk={handleCancel}
        onCancel={handleCancel}
        width={1200}
        footer={[
          // <Button key="back" onClick={handleCancel}>
          //   Cancel
          // </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleCancel}
          >
            Ok
          </Button>,
        ]}
      >
        <h2>Student List</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Id Card</th>
              <th>Name</th>
              <th>Birthdate</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((row, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{row.idCard}</td>
                <td>{row.userModel.fullName}</td>
                <td>{formatDate(row.userModel.birthDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default Courses;
