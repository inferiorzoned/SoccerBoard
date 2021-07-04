import "./styles/css/App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./login";
import ApplicationForm from "./components/applicationForm";
import ApplicationStatusForm from "./components/applicationStatusForm";
import Squad from "./components/squad";
import Recruit from "./components/recruit";
import Home from "./pages/home";
import Test from "./test/test";

function App() {
  return (
    <React.Fragment>
      <main>
        <Switch>
          <Route path="/test" component={Test} />
          <Route
            path="/application-status"
            component={ApplicationStatusForm}
          ></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/application" component={ApplicationForm}></Route>
          <Route path="/squad" component={Squad}></Route>
          <Route path="/recruit" component={Recruit}></Route>
          <Route path="/" component={Login}></Route>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
