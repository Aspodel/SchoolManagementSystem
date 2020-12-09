import React, { useState } from "react";
import "./Login.scss";

// import { FaApple, FaFacebook } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";

import { handle_Login } from "../../api";
import { Redirect, useHistory } from "react-router-dom";
import { isLogin, Role, storeToken } from "../../api/manageToken";
import NotificationBox from "../NotificationBox";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await handle_Login(data);
    const status = result.status;
    console.log(result);

    // console.log("running");

    if (result) {
      console.log(result);
      if (status === 200) {
        console.log("success");
        // storeToken(result.data.token);
        const role = Role();
        if (role === "admin") {
          return history.push("/admin");
        } else if (role === "teacher") {
          return history.push("/instructor");
        } else if (role === "student") {
          return history.push("/student");
        } else {
          return null;
        }
      } else if (status === 400) {
        console.log("heyyo");
        NotificationBox(
          "error",
          "Login Fail",
          "Username or password is incorrect!"
        );
      } else {
        NotificationBox(
          "error",
          "Network Error",
          "Please check your connection!"
        );
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (isLogin()) {
    const role = Role();
    if (role === "admin") {
      return <Redirect to="/admin" />;
    } else if (role === "instructor") {
      return <Redirect to="/instructor" />;
    } else if (role === "student") {
      return <Redirect to="/student" />;
    } else {
      return null;
    }
  }

  return (
    <div className="login">
      <div className="box">
        <span>College Database</span>
        <div className="form">
          <input
            type="text"
            placeholder="Enter email or phone number"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Sign In
          </button>
        </div>

        {/* <div className="separator">or continue with</div>

        <div className="other-account">
          <FcGoogle className="icon"/>
          <FaApple className="icon"/>
          <FaFacebook className="icon"/>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
