import "./App.scss";
import "antd/dist/antd.css";
import Login from "./components/Login/Login";

// import Admin from "./ui/Admin";
// import Instructor from "./ui/Instructor";
// import Student from "./ui/Student";

import { Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import { removeToken } from "./api/manageToken";

function App() {
  // console.log(localStorage.getItem("Token"));

  return (
    // removeToken(),
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />

        <Redirect exact from="/" to="/login" />

        {/* <Route path="/**" component={Login} /> */}

        <PrivateRoute />
      </Switch>
    </div>
  );
}

export default App;
