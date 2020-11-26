import "./App.scss";
import "antd/dist/antd.css";
import Login from "./components/Login/Login";
// import StudentUI from "./components/StudentUI/StudentUI";
import Admin from "./ui/Admin";

import { Switch, Route, Redirect } from "react-router-dom";

import Student from "./ui/Student";

function App() {
  const login = true;
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/student" component={StudentUI} /> */}

        <Route path="/admin" component={Admin} />

        <Route path="/login" component={Login} />

        <Route path="/student" component={Student} />

        {login ? (
          <Redirect from="/" to="/student" />
        ) : (
          <Redirect from="/" to="/login" />
        )}
      </Switch>
    </div>
  );
}

export default App;
