import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import "./AddCourse.scss";
import {
  add_course,
  get_departments,
  get_teacher_by_department,
} from "../../../../api";

import NotificationBox from "../../../../components/NotificationBox";

const AddCourse = (props) => {
  const [data, setData] = useState({
    CoursesName: "",
    DepartmentId: 1,
    TeacherId: 1,
    Credits: 1,
    Size: 30,
    Day: "MONDAY",
    StartPeriod: 1,
    Periods: 1,
    Room: "A1.208",
  });

  const { visible, setVisible } = props;
  const [loading, setLoading] = useState(false);
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [departmentList, setDepartmentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  const handleOk = async () => {
    setLoading(true);

    const result = await add_course(data);

    console.log(result);

    if (result) {
      setLoading(false);
      let status = result.status;
      if (status === 200) {
        NotificationBox(
          "success",
          "Successful",
          "Your course have added to database"
        );
        setVisible(false);
      } else {
        NotificationBox("error", "Fail to add course", "Please try again");
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    const getDepartmentList = async () => {
      const result = await get_departments();
      setDepartmentList(result.data);
    };

    getDepartmentList();
  }, []);

  useEffect(() => {
    const getTeacherList = async () => {
      const result = await get_teacher_by_department(data.DepartmentId);

      let value = parseInt(result.data[0].teacherId);
      setData({ ...data, TeacherId: value });
      setTeacherList(result.data);
    };

    getTeacherList();
    // console.log(teacherList);
  }, [data.DepartmentId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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

  return (
    <Modal
      className="modal"
      visible={visible}
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
          Add
        </Button>,
      ]}
    >
      <div className="form">
        <span>Course Name</span>
        <input
          type="text"
          name="CoursesName"
          onChange={(e) => handleChange(e)}
        />
        <span>Department</span>
        <select name="DepartmentId" onChange={(e) => handleChange(e)}>
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
        <select name="TeacherId" onChange={(e) => handleChange(e)}>
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
            <input type="text" name="Size" onChange={(e) => handleChange(e)} />
          </div>
          <div className="right">
            <span>Day</span>
            <select name="Day" onChange={(e) => handleChange(e)}>
              {weekdays.map((day, index) => (
                <option key={index} value={day.toUpperCase()}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row-2">
          <div className="left">
            <span>Start Period</span>
            <select name="StartPeriod" onChange={(e) => handleChange(e)}>
              {periods.map((period, index) => (
                <option key={index} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>
          <div className="right">
            <span>Periods</span>
            <select name="Periods" onChange={(e) => handleChange(e)}>
              {periods.map((period, index) => (
                <React.Fragment>
                  {index < 5 ? (
                    <option key={index} value={period}>
                      {period}
                    </option>
                  ) : null}
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
              onChange={(e) => handleChange(e)}
              style={{ textTransform: "uppercase" }}
            />
          </div>
          <div className="right">
            <span>Credit</span>
            <select name="Credits" onChange={(e) => handleChange(e)}>
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

export default AddCourse;
