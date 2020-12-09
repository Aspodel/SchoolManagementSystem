import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { isLogin, Role } from "../../api/manageToken";

import Student from "../../ui/Student";
import Instructor from "../../ui/Instructor";
import Admin from "../../ui/Admin";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   console.log(isLogin());
//   return (
//     // Show the component only when the user is logged in
//     // Otherwise, redirect the user to /login page
//     <Route
//       {...rest}
//       render={(props) =>
//         isLogin() ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// };

const PrivateRoute = (props) => {
  const checkRole = () => {
    const role = Role();

    if (role === "admin") {
      console.log("set up admin ~~~~~~~");
      return <Route path="/admin" component={Admin} />;
    } else if (role === "teacher") {
      return <Route path="/instructor" component={Instructor} />;
    } else if (role === "student") {
      return <Route path="/student" component={Student} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <React.Fragment>
      {/* <Route path="/admin" component={Admin} />

      <Route path="/student" component={Student} />

      <Route path="/instructor" component={Instructor} /> */}

      <Fragment>{isLogin() ? checkRole() : <Redirect to="/login" />}</Fragment>
    </React.Fragment>
  );
};

export default PrivateRoute;
