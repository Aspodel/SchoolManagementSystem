import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  get_courses_by_id,
  get_student_by_department,
  get_teacher_by_department,
} from "../../../../api";
import { formatDate } from "../../../../utils/format";

const Details = (props) => {
  const { visible, setVisible, rowData } = props;
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [page, setPage] = useState(1);

  const handleCancel = () => {
    setVisible(false);
    setPage(1);
  };

  useEffect(() => {
    const getStudents = async () => {
      const result = await get_student_by_department(
        rowData && rowData.departmentId
      );
    //   console.log(result.data);
      setStudentList(result.data);
    };
    const getTeachers = async () => {
      const result = await get_teacher_by_department(
        rowData && rowData.departmentId
      );
    //   console.log(result.data);
      setTeacherList(result.data);
    };

    if (rowData) {
      getStudents();
      getTeachers();
    }
  }, [props]);


  return (
    <Modal
      className="modal-box"
      visible={visible}
      onOk={handleCancel}
      onCancel={handleCancel}
      width={1200}
      footer={[
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
      {rowData && studentList && teacherList ? (
        <React.Fragment>
          <h2>{rowData.departmentName}</h2>

          <div className="navigation-slider">
            <span
              onClick={() => setPage(1)}
              className={page === 1 ? "active" : null}
            >
              Teachers
            </span>
            <span
              onClick={() => setPage(2)}
              className={page === 2 ? "active" : null}
            >
              Students
            </span>
            <span
              onClick={() => setPage(3)}
              className={page === 3 ? "active" : null}
            >
              Courses
            </span>
          </div>

          <table className={page === 3 ? null : "off"}>
            <thead>
              <tr>
                <th>No</th>
                <th>Subject</th>
                <th>Credits</th>
                <th>Rest</th>
              </tr>
            </thead>
            <tbody>
              {rowData.courses.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.coursesName}</td>
                  <td>{row.credits}</td>
                  <td>{row.rest + "/" + row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className={page === 2 ? null : "off"}>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Student Id</th>
                <th>Birthdate</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.userModel.fullName}</td>
                  <td>{row.idCard}</td>
                  <td>{formatDate(row.userModel.birthDate)}</td>
                  <td>{row.userModel.phone}</td>
                  <td>{row.userModel.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className={page === 1 ? null : "off"}>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Birthdate</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Courses</th>
              </tr>
            </thead>
            <tbody>
              {teacherList.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.userModel.fullName}</td>
                  <td>{formatDate(row.userModel.birthDate)}</td>
                  <td>{row.userModel.phone}</td>
                  <td>{row.userModel.address}</td>
                  <td>{row.courses.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        "Waiting"
      )}
    </Modal>
  );
};

export default Details;
