import React, { useEffect, useState } from "react";
import TitleBar from "../../../../components/TitleBar";
import "./Test.scss";

import { CourseList } from "../../../../api/fakeData";
import { FiCheck, FiEdit, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { Checkbox } from "antd";
// import { Link } from "react-router-dom";
import AddCourse from "./AddCourse";

const Courses = () => {
  // const data = JSON.parse(JSON.stringify(CourseList));
  const data = CourseList;
  const columns = data[0] && Object.keys(data[0]);
  const [checkedList, setCheckedList] = useState([]);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [visible, setVisible] = useState(false);

  const copiedData = JSON.parse(JSON.stringify(CourseList));
  const [newData, setNewData] = useState(copiedData);

  const [searchValue, setSearchValue] = useState("");

  const handleCheck = (e) => {
    const checked = e.target.checked;

    if (checked) {
      setCheckedList((prev) => [...prev, e.target.id]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== e.target.id));
    }
  };

  const changeBackground = (id) => {
    if (checkedList.length > 0) {
      if (checkedList.find((element) => element === id)) {
        return true;
      }
    }

    return false;
  };

  const handleInput = (e, index) => {
    console.log("running on the way");
    const value = e.target.value;
    const name = e.target.name;
    // console.log(name);
    let newList = [...newData];
    newList[index][name] = value;
    console.log("new list", newList);

    setNewData(newList);
  };

  useEffect(() => {
    // console.log(checkedList);
    console.log(newData);
    console.log(data);
  });

  const onEdit = ({ id, currentUnitPrice }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    // setUnitPrice(currentUnitPrice);
  };

  const onSave = ({ id, newUnitPrice }) => {
    // updateInventory({ id, newUnitPrice });
    onCancel();
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    });
    // reset the unit price state value
    setNewData(copiedData);
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

        <div className="card" onClick={() => setVisible(!visible)}>
          <FiPlus className="icon" />
          <span>New Course</span>
        </div>

        <AddCourse visible={visible} setVisible={setVisible} />
      </div>
      <div className="table">
        <Checkbox.Group style={{ width: "100%" }} value={checkedList}>
          <table>
            <thead>
              <tr>
                <th></th>

                {data[0] &&
                  columns.map((heading, index) => (
                    <th style={{ textTransform: "capitalize" }} key={index}>
                      {index === 0 ? "no" : heading}
                    </th>
                  ))}

                <th>Operation</th>
              </tr>
            </thead>

            <tbody>
              {search(data).map((row, rowIndex) => {
                return (
                  <tr
                    id={`row-of-${row.id}`}
                    key={rowIndex}
                    className={
                      changeBackground(row.id) ? "checked-background" : "none"
                    }
                  >
                    <td>
                      <Checkbox
                        onChange={(event) => handleCheck(event)}
                        id={row.id}
                        value={row.id}
                      />
                    </td>

                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {colIndex === 0 ? (
                          <label htmlFor={row.id}>{rowIndex + 1}</label>
                        ) : inEditMode.status &&
                          inEditMode.rowKey === row.id ? (
                          <input
                            type="text"
                            name={columns[colIndex]}
                            value={newData[rowIndex][column]}
                            onChange={(event) => handleInput(event, rowIndex)}
                          />
                        ) : (
                          <label htmlFor={row.id}>{row[column]}</label>
                        )}
                      </td>
                    ))}

                    <td className="operation-box">
                      {inEditMode.status && inEditMode.rowKey === row.id ? (
                        <div className="icon-box">
                          <FiCheck className="icon" onClick={onSave} />
                          <FiX className="icon" onClick={onCancel} />
                        </div>
                      ) : (
                        <FiEdit
                          className="icon"
                          onClick={() =>
                            onEdit({
                              id: row.id,
                            })
                          }
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Checkbox.Group>
      </div>

      {checkedList.length > 0 ? (
        <div className="option-box">
          <span>
            You have selected <span>{checkedList.length}</span>{" "}
            {checkedList.length > 1 ? "courses" : "course"}
          </span>
          <button>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default Courses;
