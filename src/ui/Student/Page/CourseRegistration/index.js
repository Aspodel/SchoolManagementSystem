import React, { useState, useEffect } from "react";
import "./CourseRegistration.scss";
import { Checkbox, Row } from "antd";

import { FiCheckCircle, FiSearch } from "react-icons/fi";

import TitleBar from "../../../../components/TitleBar";

import { CourseList, RegistedCourses } from "../../../../api/fakeData";
import { formatCurrency } from "../../../../utils/format";
import NotificationBox from "../../../../components/NotificationBox";

const CourseRegistration = () => {
  const columns = CourseList[0] && Object.keys(CourseList[0]);
  const [checkedList, setCheckedList] = useState(RegistedCourses);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {});

  const onChange = (e, row) => {
    const id = e.target.id;
    const value = e.target.checked;
    var duplicate = checkDuplicate(row);

    console.log(duplicate);
    console.log(value);

    if (value === true && duplicate === false) {
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
    } else if (duplicate && value === true) {
      NotificationBox(
        "warning",
        "Time overlaps",
        "The subject you choose are timed overlap the subjects currently selected"
      );
    } else {
      setCheckedList(checkedList.filter((item) => item !== id));
    }
  };

  const checkDuplicate = (newItem) => {
    var duplicate = false;
    const itemList = [];
    console.log("checked id", checkedList);
    if (checkedList.length > 0) {
      for (let i = 0; i < checkedList.length; i++) {
        const item = CourseList.find((course) => course.id === checkedList[i]);
        itemList.push(item);
      }

      const subjectsSameDay = itemList.filter(
        (item) => item.day === newItem.day
      );
      console.log("Subject in same day:", subjectsSameDay);

      if (subjectsSameDay.length > 0) {
        const startPeriod = newItem.startSlot;
        const endPeriod = startPeriod + newItem.sumSlot - 1;

        console.log("Start Period: ", startPeriod);
        console.log("End Period: ", endPeriod);

        for (let x = 0; x < subjectsSameDay.length; x++) {
          const startCheck = subjectsSameDay[x].startSlot;
          const endCheck = startCheck + subjectsSameDay[x].sumSlot - 1;
          console.log("counter i =", x);
          console.log("start check: ", startCheck);
          console.log("end check: ", endCheck);

          if (startCheck <= startPeriod && startPeriod <= endCheck) {
            duplicate = true;
          } else if (startCheck <= endPeriod && endPeriod <= endCheck) {
            duplicate = true;
          } /* else {
            duplicate = false;
          } */
        }
      } /* else {
        duplicate = false;
      } */
    } /* else {
      duplicate = false;
    } */

    return duplicate;
  };

  function search(rows) {
    return rows.filter(
      (row) =>
        row.subject
          .toString()
          .toLowerCase()
          .indexOf(searchValue.toString().toLowerCase()) > -1 ||
        row.instructor
          .toString()
          .toLowerCase()
          .indexOf(searchValue.toString().toLowerCase()) > -1
    );
  }

  const renderSelected = () => {
    var credit = 0;
    var money = 0;
    const data = [];

    if (checkedList.length > 0) {
      for (let i = 0; i < checkedList.length; i++) {
        var item = CourseList.find((course) => course.id === checkedList[i]);
        data.push(item);
        credit = credit + item.credit;
        money = money + item.credit * 23200 * 58;
      }
    }
    return (
      <React.Fragment>
        {data.map((row, index) => (
          <div className="row" key={row.id}>
            <span>{index + 1}</span>
            <span>{row.subject}</span>
            <span>{row.credit}</span>
            <span>{formatCurrency(row.credit * 23100 * 58)}</span>
          </div>
        ))}
        {checkedList.length > 0 ? (
          <div className="row">
            <span></span>
            <span>Total</span>
            <span>{credit}</span>
            <span>{formatCurrency(money)}</span>
          </div>
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

      <div className="courses-table">
        <div className="row-header">
          {CourseList[0] &&
            columns.map((heading, index) => (
              <span style={{ textTransform: "capitalize" }} key={heading}>
                {index === 0 ? null : heading}
              </span>
            ))}
        </div>
        <Checkbox.Group style={{ width: "100%" }} value={checkedList}>
          {search(CourseList).map((row) => (
            <Row key={row.id}>
              <Checkbox
                value={row.id}
                id={row.id}
                onChange={(event) => onChange(event, row)}
              >
                <p>{row.subject}</p>
                <p>{row.instructor}</p>
                <p>{row.credit}</p>
                <p>{row.size}</p>
                <p>{row.rest}</p>
                <p>{row.day}</p>
                <p>{row.startSlot}</p>
                <p>{row.sumSlot}</p>
                <p>{row.room}</p>
              </Checkbox>
            </Row>
          ))}
        </Checkbox.Group>
      </div>

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

        <div className="row-header">
          <span>No</span>
          <span>Subject</span>
          <span>Credit</span>
          <span>Tuition</span>
        </div>
        {renderSelected()}
      </div>
    </div>
  );
};

export default CourseRegistration;
