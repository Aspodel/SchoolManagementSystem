import React, { useEffect, useState } from "react";
import TitleBar from "../../../../components/TitleBar";
import "./Courses.scss";

import { CourseList } from "../../../../api/fakeData";
import { Checkbox } from "antd";
import { FiEdit } from "react-icons/fi";

const Courses = () => {
  const data = CourseList;
  const columns = data[0] && Object.keys(data[0]);
  const [checkedList, setCheckedList] = useState([]);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const handleCheck = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setCheckedList([...checkedList, e.target.id]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== e.target.id));
    }
  };

  useEffect(() => {
    // console.log(checkedList);
  });

  const onEdit = ({ id, currentUnitPrice }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    // setUnitPrice(currentUnitPrice);
  };

  return (
    <div className="courses">
      <TitleBar title="Courses" />

      <div className="table">
        <table>
          <thead>
            <tr>
              {data[0] &&
                columns.map((heading, index) => (
                  <th style={{ textTransform: "capitalize" }} key={index}>
                    {index === 0 ? "No" : heading}
                  </th>
                ))}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {colIndex === 0 ? (
                      <Checkbox
                        id={row.id}
                        onChange={(event) => handleCheck(event)}
                      />
                    ) : inEditMode.status && inEditMode.rowKey === row.id ? (
                      // <div>
                        <input
                          // value={unitPrice}
                          defaultValue={row[column]}
                          // onChange={(event) => setUnitPrice(event.target.value)}
                        />
                      //</div>
                    ) : (
                      <div>
                        <label htmlFor={row.id}>{row[column]}</label>
                      </div>
                    )}
                  </td>
                ))}
                <td>
                  <FiEdit
                    className="icon"
                    onClick={() =>
                      onEdit({
                        id: row.id /* currentUnitPrice: item.unit_price */,
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
