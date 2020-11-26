import { notification } from "antd";

const NotificationBox = (type, title, content) => {
  notification[type]({
    message: title,
    description: content,
    // duration: 2,
  });
};

export default NotificationBox;
