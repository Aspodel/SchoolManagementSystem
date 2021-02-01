import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiSearch } from "react-icons/fi";
import { get_students } from "../../../../api";
import TitleBar from "../../../../components/TitleBar";
import { formatDate } from "../../../../utils/format";
import AddStudent from "./AddStudent";
import "./Student.scss";
import AddFile from "./AddFile";

const Student = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addFileVisible, setAddFileVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      const result = await get_students();
      console.log(result.data);
      setStudentList(result.data);
    };

    getStudents();
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

  return (
    <div className="student">
      <TitleBar title="Manage Students" />

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
            <span>New Student</span>
          </div>
        </div>

        <AddFile visible={addFileVisible} setVisible={setAddFileVisible} />
        <AddStudent visible={addModalVisible} setVisible={setAddModalVisible} />
      </div>

      <div className="table">
        <Checkbox.Group style={{ width: "100%" }} value={checkedList}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>No</th>
                <th>Id Card</th>
                <th>Name</th>
                <th>Department</th>
                <th>Birthday</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {studentList.map((row, index) => (
                <tr
                  id={`row-of-${row.studentId}`}
                  key={index}
                  className={
                    changeBackground(row.studentId)
                      ? "checked-background"
                      : "none"
                  }
                >
                  <td>
                    <Checkbox
                      id={row.studentId}
                      value={row.studentId}
                      onChange={(event) => handleCheck(event)}
                    />
                  </td>
                  <td>
                    <label htmlFor={row.studentId}>{index + 1}</label>
                  </td>
                  <td>
                    <label htmlFor={row.studentId}>{row.idCard}</label>
                  </td>
                  <td>
                    <label htmlFor={row.studentId}>
                      {row.userModel.fullName}
                    </label>
                  </td>
                  <td>
                    <label htmlFor={row.studentId}>
                      {row.department.departmentName}
                    </label>
                  </td>
                  <td>
                    <label htmlFor={row.studentId}>
                      {formatDate(row.userModel.birthDate)}
                    </label>
                  </td>
                  <td>
                    <label htmlFor={row.studentId}>
                      {"0" + row.userModel.phone}
                    </label>
                  </td>
                  <td>
                    <label htmlFor={row.studentId}>
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
            {checkedList.length > 1 ? "students" : "students"}
          </span>
          <button>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default Student;
