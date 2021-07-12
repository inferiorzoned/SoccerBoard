import "./styles/css/App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./login";
import ApplicationForm from "./components/applicationForm";
import ApplicationStatusForm from "./components/applicationStatusForm";
import GameSquad from "./components/gameSquad";
import Recruit from "./components/recruit";
import Home from "./pages/home";
import Test from "./test/test";
import EvaluationTable from "./components/evaluationTable";
import EvaluationResultTable from "./components/evaluationResultTable";

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
          <Route
            path="/evaluation-result"
            component={EvaluationResultTable}
          ></Route>
          <Route path="/evaluation" component={EvaluationTable}></Route>
          <Route path="/squad" component={GameSquad}></Route>
          <Route path="/recruit" component={Recruit}></Route>
          <Route path="/" component={Login}></Route>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
