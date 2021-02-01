import React, { useState, useEffect } from "react";
import "./CourseRegistration.scss";
import { Checkbox } from "antd";

import { FiCheckCircle, FiSearch } from "react-icons/fi";

import TitleBar from "../../../../components/TitleBar";

import { formatCurrency } from "../../../../utils/format";
import NotificationBox from "../../../../components/NotificationBox";
import { apply_course, get_courses, get_user_infor } from "../../../../api";

const CourseRegistration = () => {
  const [courseList, setCourseList] = useState();
  const [checkedList, setCheckedList] = useState([]);
  const [registed, setRegisted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const getCousrses = async () => {
      const result = await get_courses();
      setCourseList(result.data);
    };

    getCousrses();
  }, [loading]);

  useEffect(() => {
    const getUserInfor = async () => {
      const result = await get_user_infor();
      let list = result && result.data.courses.map((a) => a.coursesId);
      setCheckedList(list);
      setRegisted(list);
    };

    getUserInfor();
  }, [loading]);

  useEffect(() => {
    console.log(checkedList);
    console.log(courseList);
    console.log(registed);
    // console.log(JSON.stringify(checkedList));
    // console.log(JSON.stringify(registed));
    // console.log(JSON.stringify(checkedList) === JSON.stringify(registed));
  });

  const handleSave = async () => {
    setLoading(true);
    let listId = [];
    for (let i = 0; i < checkedList.length; i++) {
      if (registed.find((item) => item === checkedList[i])) {
        console.log(checkedList[i]);
      } else {
        console.log("new", checkedList[i]);
        listId.push(checkedList[i]);
      }
    }
    console.log(listId);
    let result = await apply_course(listId);
    console.log(result);

    if (result) {
      let status = result.status;
      if (status === 200) {
        NotificationBox(
          "success",
          "Successful",
          "Your courses have been saved to database"
        );
        setLoading(false);
      } else {
        NotificationBox(
          "error",
          "Fail to save to database",
          "Please try again"
        );
        setLoading(false);
      }
    }
  };

  const onChange = (e, row) => {
    const id = e.target.id;
    const value = e.target.checked;
    console.log(value);

    if (value) {
      let duplicate = checkDuplicate(row);
      console.log(duplicate);

      if (duplicate) {
        NotificationBox(
          "warning",
          "Time overlaps",
          "The subject you choose are timed overlap the subjects currently selected"
        );
      } else {
        if (row.rest !== 0) {
          if (!checkedList.includes(id)) {
            setCheckedList((prev) => [...prev, e.target.id]);
          }
        } else {
          NotificationBox(
            "warning",
            "Out Of Empty Slots",
            "This course has run out of slots"
          );
        }
      }
    } else {
      setCheckedList(checkedList.filter((item) => item !== id));
    }
  };

  const checkDuplicate = (newItem) => {
    var duplicate = false;
    const itemList = [];
    // console.log("checked id", checkedList);
    if (checkedList.length > 0) {
      for (let i = 0; i < checkedList.length; i++) {
        const item = courseList.find(
          (course) => course.coursesId === checkedList[i]
        );
        itemList.push(item);
      }

      const subjectsSameDay = itemList.filter(
        (item) => item.day === newItem.day
      );
      // console.log("Subject in same day:", subjectsSameDay);

      if (subjectsSameDay.length > 0) {
        const startPeriod = newItem.startPeriod;
        const endPeriod = startPeriod + newItem.periods - 1;

        // console.log("Start Period: ", startPeriod);
        // console.log("End Period: ", endPeriod);

        for (let x = 0; x < subjectsSameDay.length; x++) {
          const startCheck = subjectsSameDay[x].startPeriod;
          const endCheck = startCheck + subjectsSameDay[x].periods - 1;
          // console.log("counter i =", x);
          // console.log("start check: ", startCheck);
          // console.log("end check: ", endCheck);

          if (startCheck <= startPeriod && startPeriod <= endCheck) {
            duplicate = true;
          } else if (startCheck <= endPeriod && endPeriod <= endCheck) {
            duplicate = true;
          }
        }
      }
    }

    return duplicate;
  };

  const changeBackground = (id) => {
    if (checkedList.length > 0) {
      if (checkedList.find((element) => element === id)) {
        return true;
      }
    }
    return false;
  };

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

  const renderSelected = () => {
    var credit = 0;
    var money = 0;
    const data = [];

    if (checkedList && checkedList.length > 0) {
      for (let i = 0; i < checkedList.length; i++) {
        var item =
          courseList &&
          courseList.find((course) => course.coursesId === checkedList[i]);
        data.push(item);
        credit = credit + item.credits;
        money = money + item.credits * 1350000;
      }
    }
    return (
      <React.Fragment>
        {data &&
          data.map((row, index) => (
            <tr key={row.coursesId}>
              <td>{index + 1}</td>
              <td>{row.coursesName}</td>
              <td>{row.credits}</td>
              <td>{formatCurrency(row.credits * 1350000)}</td>
            </tr>
          ))}
        {checkedList.length > 0 ? (
          <tr>
            <td></td>
            <td>Total</td>
            <td>{credit}</td>
            <td>{formatCurrency(money)}</td>
          </tr>
        ) : null}
      </React.Fragment>
    );
  };

  return (
    <div className="course-registration">
      <TitleBar title="Course Registration" />

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

      <Checkbox.Group style={{ width: "100%" }} value={checkedList}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Subject</th>
              <th>Instructor</th>
              <th>Credit</th>
              <th>Rest</th>
              <th>Day</th>
              <th>Start</th>
              <th>Periods</th>
              <th>Room</th>
            </tr>
          </thead>

          <tbody>
            {courseList &&
              search(courseList).map((row, index) => (
                <tr
                  id={`row-of-${row.coursesId}`}
                  key={index}
                  className={
                    changeBackground(row.coursesId) ? "checked-background" : ""
                  }
                >
                  <td>
                    <Checkbox
                      value={row.coursesId}
                      id={row.coursesId}
                      onChange={(event) => onChange(event, row)}
                    />
                  </td>
                  <td>
                    <label htmlFor={row.coursesId}>{row.coursesName}</label>
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
                    <label htmlFor={row.coursesId}>
                      {row.rest}/{row.size}
                    </label>
                  </td>
                  <td>
                    <label htmlFor={row.coursesId}>
                      {weekdays[row.day - 1]}
                    </label>
                  </td>
                  <td>
                    <label htmlFor={row.coursesId}>{row.startPeriod}</label>
                  </td>
                  <td>
                    <label htmlFor={row.coursesId}>{row.periods}</label>
                  </td>
                  <td style={{ textTransform: "capitalize" }}>
                    <label htmlFor={row.coursesId}>{row.room}</label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Checkbox.Group>
      {/* </div> */}

      <div className="selected-table">
        <div className="title-bar">
          <FiCheckCircle className="symbol" />

          <div className="title">
            <span>
              <span>Selected Courses</span>
              <div className="visible"></div>
            </span>
            <span></span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Subject</th>
              <th>Credit</th>
              <th>Tuition</th>
            </tr>
          </thead>

          <tbody>{renderSelected()}</tbody>
        </table>
        {JSON.stringify(checkedList) !== JSON.stringify(registed) ? (
          <div className="save-box">
            <span>Your changes have not been saved.</span>
            <button onClick={handleSave}>Save</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CourseRegistration;
