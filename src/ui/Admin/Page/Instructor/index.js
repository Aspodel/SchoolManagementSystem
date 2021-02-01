import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiSearch } from "react-icons/fi";
import { get_teachers } from "../../../../api";
import TitleBar from "../../../../components/TitleBar";
import { formatDate } from "../../../../utils/format";
import "./Instructor.scss";
import AddInstructor from "./AddInstructor";
import AddFile from "./AddFile";

const Instructor = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addFileVisible, setAddFileVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // const [rowId, setRowId] = useState();

  useEffect(() => {
    const getTeachers = async () => {
      const result = await get_teachers();
      console.log(result.data);
      setTeacherList(result.data);
    };

    getTeachers();
  }, [addModalVisible, addFileVisible, updateModalVisible]);

  const changeBackground = (id) => {
    if (checkedList.length > 0) {
      if (checkedList.find((element) => element === id)) {
        return true;
      }
    }
    return false;
  };

  const handleCheck = (e) => {
    const checked = e.target.checked;

    if (checked) {
      setCheckedList((prev) => [...prev, e.target.id]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== e.target.id));
    }
  };

  function search(rows) {
    return rows.filter(
      (row) =>
        row.department.departmentName
          .toString()
          .toLowerCase()
          .indexOf(searchValue.toString().toLowerCase()) > -1 ||
        row.userModel.fullName
          .toString()
          .toLowerCase()
          .indexOf(searchValue.toString().toLowerCase()) > -1
    );
  }

  return (
    <div className="instructor">
      <TitleBar title="Manage Instructors" />

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
            <span>New Instructor</span>
          </div>
        </div>

        <AddFile visible={addFileVisible} setVisible={setAddFileVisible} />
        <AddInstructor
          visible={addModalVisible}
          setVisible={setAddModalVisible}
        />
      </div>

      <div className="table">
        <Checkbox.Group style={{ width: "100%" }} value={checkedList}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>No</th>
                <th>Name</th>
                <th>Department</th>
                <th>Birthday</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {search(teacherList).map((row, index) => (
                <tr
                  id={`row-of-${row.teacherId}`}
                  key={index}
                  className={
                    changeBackground(row.teacherId)
                      ? "checked-background"
                      : "none"
                  }
                >
                  <td>
                    <Checkbox
                      id={row.teacherId}
                      value={row.teacherId}
                      onChange={(event) => handleCheck(event)}
                    />
                  </td>
                  <td>
                    <label htmlFor={row.teacherId}>{index + 1}</label>
                  </td>
                  <td>
                    <label htmlFor={row.teacherId}>
                      {row.userModel.fullName}
                    </label>
                  </td>
                  <td>
                    <label htmlFor={row.teacherId}>
                      {row.department.departmentName}
                    </label>
                  </td>
                  <td>
                    <label htmlFor={row.teacherId}>
                      {formatDate(row.userModel.birthDate)}
                    </label>
                  </td>
                  <td>
                    <label htmlFor={row.teacherId}>{row.userModel.phone}</label>
                  </td>
                  <td>
                    <label htmlFor={row.teacherId}>
                      {row.userModel.address}
                    </label>
                  </td>

                  <td className="operation-box">
                    <FiEdit className="icon" />

                    {/* <UpdateCourse
                      visible={updateModalVisible}
                      setVisible={setUpdateModalVisible}
                    /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Checkbox.Group>
      </div>

      {checkedList.length > 0 ? (
        <div className="option-box">
          <span>
            You have selected <span>{checkedList.length}</span>{" "}
            {checkedList.length > 1 ? "instructors" : "instructor"}
          </span>
          <button>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default Instructor;
