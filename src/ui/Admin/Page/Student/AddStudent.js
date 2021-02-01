import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { get_departments, register } from "../../../../api";
import NotificationBox from "../../../../components/NotificationBox";

const AddStudent = (props) => {
  const { visible, setVisible } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    UserName: "",
    FullName: "",
    Password: "123456",
    Phone: 123456,
    Address: "",
    Role: "student",
    DepartmentId: 0,
    BirthDate: 1,
    IdCard: "",
  });
  const [departmentList, setDepartmentList] = useState([]);

  const handleOk = async () => {
    setLoading(true);

    const result = await register(data);

    console.log(result);

    if (result) {
      setLoading(false);
      let status = result.status;
      if (status === 200) {
        if (result.data.succeeded) {
          NotificationBox(
            "success",
            "Successful",
            "Student have been added to database"
          );
          setVisible(false);
        } else {
          NotificationBox(
            "error",
            `${result.data.errors[0].code}`,
            `${result.data.errors[0].description}`
          );
        }
      } else {
        NotificationBox(
          "error",
          "Fail to create new instructor",
          "Please try again"
        );
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleChange = async (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Phone" || name === "DepartmentId") {
      // console.log("name", name, "value", value);
      if (value) {
        value = parseInt(value);
      }
      setData({ ...data, [name]: value });
    } else if (name === "UserName") {
      setData({ ...data, [name]: value, IdCard: value });
      // console.log("hey yo");
    } else {
      setData({ ...data, [name]: value });
      // console.log("name1", name, "value1", value);
    }
  };

  useEffect(() => {
    const getDepartmentList = async () => {
      const result = await get_departments();
      setDepartmentList(result.data);
    };

    getDepartmentList();
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

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
        <span>Full name</span>
        <input type="text" name="FullName" onChange={(e) => handleChange(e)} />

        <span>Department</span>
        <select
          name="DepartmentId"
          value={data.DepartmentId}
          onChange={(e) => handleChange(e)}
        >
          <option value="0" disabled hidden>
            Choose here
          </option>
          <React.Fragment>
            {departmentList.map((item, index) => (
              <option
                key={index}
                value={item.departmentId}
                label={item.departmentName}
              ></option>
            ))}
          </React.Fragment>
        </select>

        <span>Birthdate</span>
        <input type="date" name="BirthDate" onChange={(e) => handleChange(e)} />

        <span>Phone number</span>
        <input type="text" name="Phone" onChange={(e) => handleChange(e)} />

        <span>Address</span>
        <input type="text" name="Address" onChange={(e) => handleChange(e)} />

        <span>ID Card</span>
        <input type="text" name="UserName" onChange={(e) => handleChange(e)} />
      </div>
    </Modal>
  );
};

export default AddStudent;
