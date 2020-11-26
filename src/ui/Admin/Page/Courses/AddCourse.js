import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./AddCourse.scss";

const AddCourse = (props) => {
  //   const [visible, setVisible] = useState(false);
  const { visible, setVisible } = props;
  const [loading, setLoading] = useState(false);
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleOk = () => {
    setLoading(false);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 6000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      className="modal"
      visible={visible}
      //   title="Create new course"
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
          Submit
        </Button>,
      ]}
    >
      <div className="form">
        <span>Subject</span>
        <input type="text" />
        <span>Department</span>
        <input type="text" />
        <span>Instructor</span>
        <input type="text" />
        <div className="row-2">
          <div className="left">
            <span>Size</span>
            <input type="text" />
          </div>
          <div className="right">
            <span>Day</span>
            <select name="" id="">
              {weekdays.map((day) => (
                <option>{day}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row-2">
          <div className="left">
            <span>Start Slot</span>
            <select name="" id="">
              {periods.map((period) => (
                <option>{period}</option>
              ))}
            </select>
          </div>
          <div className="right">
            <span>Sum Slot</span>
            <select name="" id="">
              {periods.map((period, index) => (
                <React.Fragment>
                  {index < 5 ? <option>{period}</option> : null}
                </React.Fragment>
              ))}
            </select>
          </div>
        </div>
        <div className="row-2">
          <div className="left">
            <span>Room</span>
            <input type="text" />
          </div>
          <div className="right">
            <span>Credit</span>
            <select name="" id="">
              {periods.map((period, index) => (
                <React.Fragment>
                  {index < 5 || index === 9 ? <option>{period}</option> : null}
                </React.Fragment>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddCourse;
