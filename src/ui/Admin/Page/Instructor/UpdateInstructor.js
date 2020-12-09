import React from "react";
import { Modal, Button } from "antd";
import NotificationBox from "../../../../components/NotificationBox";

const UpdateInstructor = (props) => {
  const { visible, setVisible } = props;
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      className="modal"
      visible={updateModalVisible}
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
          Edit
        </Button>,
      ]}
    ></Modal>
  );
};

export default UpdateInstructor;
