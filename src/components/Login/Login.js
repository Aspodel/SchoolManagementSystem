import React from "react";
import "./Login.scss";

import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  return (
    <div className="login">
      <div className="box">
        <span>College Database</span>
        <div className="form">
          <input type="text" placeholder="Enter email or phone number" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </div>
        
        <div className="separator">or continue with</div>

        <div className="other-account">
          <FcGoogle className="icon"/>
          <FaApple className="icon"/>
          <FaFacebook className="icon"/>
        </div>
      </div>
    </div>
  );
};

export default Login;
