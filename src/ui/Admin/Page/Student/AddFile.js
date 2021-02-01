import { Button, Modal } from "antd";
import React, { useState } from "react";
import { upload_student } from "../../../../api";
import NotificationBox from "../../../../components/NotificationBox";

const AddFile = (props) => {
  const { visible, setVisible } = props;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleOk = async (e) => {
    setLoading(true);
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const result = await upload_student(formData);

    if (result) {
      setLoading(false);
      let status = result.status;
      if (status === 200) {
        NotificationBox(
          "success",
          "Successful",
          "Student have been added to database"
        );
        setVisible(false);
        // setFile(null);
      } else {
        NotificationBox(
          "error",
          "Fail to create new instructor",
          "Please try again"
        );
      }
    }

    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

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
      <h1>Add Student List file</h1>
      <label className="file">
        <input
          type="file"
          id="file"
          aria-label="File browser example"
          className="custom-file-input"
          //   value={file}
          onChange={handleChange}
        />
        <span className="file-custom"></span>
      </label>
    </Modal>
  );
};

export default AddFile;
