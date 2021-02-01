import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { add_department } from "../../../../api";
import NotificationBox from "../../../../components/NotificationBox";

const AddDepartment = (props) => {
  const { visible, setVisible } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ DepartmentName: "" });

  const handleOk = async () => {
    setLoading(true);

    const result = await add_department(data);

    console.log(result);

    if (result) {
      setLoading(false);
      let status = result.status;
      if (status === 200) {
        if (result.data === "") {
          NotificationBox(
            "success",
            "Successful",
            "Student have been added to database"
          );
          setVisible(false);
        } else {
          NotificationBox(
            "error",
            `Duplicate department name`,
            `${result.data}`
          );
        }
      } else {
        NotificationBox("error", "Fail to add department", "Please try again");
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
        <span>Department Name</span>
        <input
          type="text"
          name="CoursesName"
          onChange={(e) => setData({ DepartmentName: e.target.value })}
        />
      </div>
    </Modal>
  );
};

export default AddDepartment;
