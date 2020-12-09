import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import NotificationBox from "../../../../components/NotificationBox";
import "./AddCourse.scss";
import {
  get_departments,
  get_teacher_by_department,
  update_courses,
} from "../../../../api";

const UpdateCourse = (props) => {
  const { updateModalVisible, setUpdateModalVisible, rowData } = props;
  const [loading, setLoading] = useState(false);

  const [departmentList, setDepartmentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  // const [data, setData] = useState();
  const [data, setData] = useState({
    CoursesId: null,
    CoursesName: "",
    TeacherId: null,
    DepartmentId: 1,
    Size: null,
    Credits: null,
    Periods: null,
    Room: "",
    Day: "MONDAY",
    StartPeriod: null,
  });

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleOk = async () => {
    setLoading(true);
    const result = await update_courses(data);
    console.log(result);
    if (result) {
      setLoading(false);
      let status = result.status;
      if (status === 200) {
        NotificationBox("success", "Successful", "This course has updated");

        setUpdateModalVisible(false);
      } else {
        NotificationBox(
          "error",
          "Fail to update this course",
          "Please try again"
        );
      }
    }
  };

  const handleCancel = () => {
    setUpdateModalVisible(false);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    if (name === "CoursesName" || name === "Room" || name === "Day") {
      // console.log("name", name, "value", value);
      setData({ ...data, [name]: value });
    } else {
      if (value) {
        value = parseInt(value);
      }
      setData({ ...data, [name]: value });
      // console.log("name1", name, "value1", value);
    }
  };

  // useEffect(() => {
  //   console.log(rowData);
  //   console.log(data);
  //   console.log(data.DepartmentId);
  // });

  useEffect(() => {
    setData({
      CoursesId: rowData && rowData.coursesId,
      CoursesName: rowData && rowData.coursesName,
      TeacherId: rowData && rowData.teacher.teacherId,
      DepartmentId: rowData && rowData.department.departmentId,
      Size: rowData && rowData.size,
      Credits: rowData && rowData.credits,
      Periods: rowData && rowData.periods,
      Room: rowData && rowData.room,
      Day: rowData && rowData.day,
      StartPeriod: rowData && rowData.startPeriod,
    });
  }, [props]);

  useEffect(() => {
    const getDepartmentList = async () => {
      const result = await get_departments();
      setDepartmentList(result.data);
    };

    getDepartmentList();
  }, []);

  useEffect(() => {
    const getTeacherList = async () => {
      const result = await get_teacher_by_department(data && data.DepartmentId);
      setTeacherList(result.data);
    };

    getTeacherList();
    // console.log(teacherList);
  }, [data.DepartmentId]);

  return (
    <Modal
      className="modal"
      visible={updateModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={520}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Edit
        </Button>,
      ]}
    >
      <div className="form">
        <span>Course Name</span>
        <input
          type="text"
          name="CoursesName"
          value={data.CoursesName}
          onChange={(e) => handleChange(e)}
        />
        <span>Department</span>
        <select
          name="DepartmentId"
          onChange={(e) => handleChange(e)}
          value={data.DepartmentId}
        >
          {departmentList ? (
            <React.Fragment>
              {departmentList.map((item, index) => (
                <option
                  key={index}
                  value={item.departmentId}
                  label={item.departmentName}
                ></option>
              ))}
            </React.Fragment>
          ) : (
            <option value={0}>No Data</option>
          )}
        </select>
        <span>Instructor</span>
        <select
          name="TeacherId"
          onChange={(e) => handleChange(e)}
          value={data.TeacherId}
        >
          {teacherList ? (
            <React.Fragment>
              {teacherList.map((item, index) => (
                <option
                  key={index}
                  value={item.teacherId}
                  label={item.userModel.fullName}
                ></option>
              ))}
            </React.Fragment>
          ) : (
            <option>No Data</option>
          )}
        </select>
        <div className="row-2">
          <div className="left">
            <span>Size</span>
            <input
              type="text"
              name="Size"
              value={data.Size}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="right">
            <span>Day</span>
            <select
              name="Day"
              value={data.Day}
              onChange={(e) => handleChange(e)}
            >
              {weekdays.map((day, index) => (
                <option key={index} value={index + 1}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row-2">
          <div className="left">
            <span>Start Period</span>
            <select
              name="StartPeriod"
              value={data.StartPeriod}
              onChange={(e) => handleChange(e)}
            >
              {periods.map((period, index) => (
                <option key={index} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>
          <div className="right">
            <span>Periods</span>
            <select
              name="Periods"
              value={data.Periods}
              onChange={(e) => handleChange(e)}
            >
              {periods.map((period, index) => (
                <React.Fragment>
                  {index < 5 ? <option value={period}>{period}</option> : null}
                </React.Fragment>
              ))}
            </select>
          </div>
        </div>
        <div className="row-2">
          <div className="left">
            <span>Room</span>
            <input
              type="text"
              name="Room"
              value={data.Room}
              onChange={(e) => handleChange(e)}
              style={{ textTransform: "uppercase" }}
            />
          </div>
          <div className="right">
            <span>Credit</span>
            <select
              name="Credits"
              value={data.Credits}
              onChange={(e) => handleChange(e)}
            >
              {periods.map((period, index) => (
                <React.Fragment>
                  {index < 5 || index === 9 ? (
                    <option key={index} value={period}>
                      {period}
                    </option>
                  ) : null}
                </React.Fragment>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateCourse;
