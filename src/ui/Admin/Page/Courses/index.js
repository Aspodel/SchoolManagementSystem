import React, { useEffect, useState } from "react";
import TitleBar from "../../../../components/TitleBar";
import "./Courses.scss";

import { FiEdit, FiPlus, FiSearch } from "react-icons/fi";
import { Checkbox } from "antd";
import AddCourse from "./AddCourse";
import UpdateCourse from "./UpdateCourse";
import { delete_courses, get_courses } from "../../../../api";
import { Modal, Button } from "antd";
import NotificationBox from "../../../../components/NotificationBox";
import AddFile from "./AddFile";

const Courses = () => {
  const [courseList, setCourseList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addFileVisible, setAddFileVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [rowId, setRowId] = useState();

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleCheck = (e) => {
    const checked = e.target.checked;

    if (checked) {
      setCheckedList((prev) => [...prev, e.target.id]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== e.target.id));
    }
  };

  const changeBackground = (id) => {
    if (checkedList && checkedList.length > 0) {
      if (checkedList.find((element) => element === id)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const getCourses = async () => {
      const result = await get_courses();
      // console.log(result.data);
      setCourseList(result.data);
    };

    getCourses();
  }, [
    addModalVisible,
    addFileVisible,
    updateModalVisible,
    confirmModalVisible,
  ]);

  function search(rows) {
    return rows.filter(
      (row) =>
        row.coursesName
          .toString()
          .toLowerCase()
          .indexOf(searchValue.toString().toLowerCase()) > -1 ||
        row.teacher.teacherName
          .toString()
          .toLowerCase()
          .indexOf(searchValue.toString().toLowerCase()) > -1
    );
  }

  const showUpdateBox = (id) => {
    setRowId(id);
    setUpdateModalVisible(!updateModalVisible);
  };

  useEffect(() => {
    console.log(checkedList);
  });

  const handleDelete = async () => {
    setLoading(true);
    console.log("before request", checkedList);
    const result = await delete_courses(checkedList);

    console.log(result);

    if (result) {
      setLoading(false);
      let status = result.status;
      if (status === 200) {
        NotificationBox(
          "success",
          "Successful",
          "These course have been deleted"
        );
        setCheckedList([]);
        setConfirmModalVisible(!confirmModalVisible);
      } else {
        NotificationBox("error", "Fail to delete courses", "Please try again");
      }
    }
  };

  return (
    <div className="courses">
      <TitleBar title="Courses" />

      <div className="option-bar">
        <div className="search-box">
          <FiSearch className="icon" />
          <input
            type="text"
            className="search"
            placeholder="Search "
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            spellCheck="false"
          />
        </div>

        <div className="right">
          <div
            className="card"
            onClick={() => setAddFileVisible(!addFileVisible)}
          >
            <FiPlus className="icon" />
            <span>Add File</span>
          </div>

          <div
            className="card"
            onClick={() => setAddModalVisible(!addModalVisible)}
          >
            <FiPlus className="icon" />
            <span>New Course</span>
          </div>
        </div>

        <AddFile visible={addFileVisible} setVisible={setAddFileVisible} />

        <AddCourse visible={addModalVisible} setVisible={setAddModalVisible} />
      </div>
      <div className="table">
        <Checkbox.Group style={{ width: "100%" }} value={checkedList}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>No</th>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Credit</th>
                <th>Size</th>
                <th>Day</th>
                <th>Start Period</th>
                <th>Periods</th>
                <th>Room</th>
                <th>Operation</th>
              </tr>
            </thead>

            <tbody>
              {courseList ? (
                <React.Fragment>
                  {search(courseList).map((row, rowIndex) => {
                    return (
                      <tr
                        id={`row-of-${row.coursesId}`}
                        key={rowIndex}
                        className={
                          changeBackground(row.coursesId)
                            ? "checked-background"
                            : "none"
                        }
                      >
                        <td>
                          <Checkbox
                            onChange={(event) => handleCheck(event)}
                            id={row.coursesId}
                            value={row.coursesId}
                          />
                        </td>

                        <td>
                          <label htmlFor={row.coursesId}>{rowIndex + 1}</label>
                        </td>

                        <td>
                          <label htmlFor={row.coursesId}>
                            {row.coursesName}
                          </label>
                        </td>

                        <td>
                          <label htmlFor={row.coursesId}>
                            {row.teacher.teacherName}
                          </label>
                        </td>

                        <td>
                          <label htmlFor={row.coursesId}>{row.credits}</label>
                        </td>

                        <td>
                          <label htmlFor={row.coursesId}>{row.size}</label>
                        </td>

                        <td>
                          <label htmlFor={row.coursesId}>
                            {weekdays[row.day - 1]}
                          </label>
                        </td>
                        <td>
                          <label htmlFor={row.coursesId}>
                            {row.startPeriod}
                          </label>
                        </td>
                        <td>
                          <label htmlFor={row.coursesId}>{row.periods}</label>
                        </td>
                        <td>
                          <label
                            htmlFor={row.coursesId}
                            style={{ textTransform: "capitalize" }}
                          >
                            {row.room}
                          </label>
                        </td>

                        <td className="operation-box">
                          <FiEdit
                            className="icon"
                            onClick={() => showUpdateBox(row)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ) : (
                <span>No Data</span>
              )}
            </tbody>
          </table>
        </Checkbox.Group>
      </div>

      <UpdateCourse
        updateModalVisible={updateModalVisible}
        setUpdateModalVisible={setUpdateModalVisible}
        rowData={rowId}
      />

      {checkedList.length > 0 ? (
        <div className="option-box">
          <span>
            You have selected <span>{checkedList.length}</span>{" "}
            {checkedList.length > 1 ? "courses" : "course"}
          </span>
          <button onClick={() => setConfirmModalVisible(!confirmModalVisible)}>
            Delete
          </button>
        </div>
      ) : null}

      <Modal
        // className="modal"
        visible={confirmModalVisible}
        // title="Create new course"
        onOk={handleDelete}
        onCancel={() => setConfirmModalVisible(!confirmModalVisible)}
        width={400}
        footer={[
          <Button
            key="back"
            onClick={() => setConfirmModalVisible(!confirmModalVisible)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>,
        ]}
      >
        <h3>Do you want to delete these items?</h3>
      </Modal>
    </div>
  );
};

export default Courses;
