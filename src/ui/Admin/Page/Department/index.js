import React, { useEffect, useState } from "react";
import { FiChevronRight, FiPlus, FiSearch } from "react-icons/fi";
import {
  get_departments,
  //   get_teacher_by_department,
  //   get_student_by_department,
} from "../../../../api";
import TitleBar from "../../../../components/TitleBar";
import AddDepartment from "./AddDepartment";
import AddFile from "./AddFile";
import "./Department.scss";
import Details from "./Details";

const Department = () => {
  const [searchValue, setSearchValue] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addFileVisible, setAddFileVisible] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const getDepartments = async () => {
      const result = await get_departments();
      //   console.log(result.data);
      //   console.log(result.data[1].students);
      setDepartmentList(result.data);
    };

    getDepartments();
  }, [addModalVisible,addFileVisible]);

  const showDetails = (rowData) => {
    // console.log(rowData);
    setData(rowData);
    setDetailVisible(!detailVisible);
  };

  function search(rows) {
    if (rows) {
      return rows.filter(
        (row) =>
          row.departmentName
            .toString()
            .toLowerCase()
            .indexOf(searchValue.toString().toLowerCase()) > -1
      );
    }
  }

  return (
    <div className="department">
      <TitleBar title="Manage Departments" />

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
            <span>New Department</span>
          </div>
        </div>

        <AddFile visible={addFileVisible} setVisible={setAddFileVisible} />

        <AddDepartment
          visible={addModalVisible}
          setVisible={setAddModalVisible}
        />
      </div>

      <Details
        visible={detailVisible}
        setVisible={setDetailVisible}
        rowData={data && data}
      />

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Instructors</th>
            <th>Students</th>
            <th>Courses</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {departmentList.map((row, index) => (
            <tr key={row.departmentId} onClick={() => showDetails(row)}>
              <td>{index + 1}</td>
              <td>{row.departmentName}</td>
              <td>{row.teachers.length}</td>
              <td>{row.students.length}</td>
              <td>{row.courses.length}</td>
              <td>
                <FiChevronRight className="icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Department;
