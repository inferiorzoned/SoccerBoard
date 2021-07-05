// import logo from './logo.svg';
import Navbar from "../components/navbar.jsx";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home";
import TrainingSession from "../pages/trainingSession";
import TrainingRepo from "../pages/trainingRepo";
import Recruit from "../pages/recruit";
import Squad from "../pages/squad";
import CreateTraining from "../pages/createTraining";
import Training from "../pages/training";
import CreateNewSession from "../pages/createNewSession.jsx";
import GameSquad from "./gameSquad.jsx";
import Evaluation from "../pages/evaluation.jsx";
import EvaluationResult from "../pages/evaluationResult.jsx";

function Root() {
  return (
    <div>
      <main className="App">
        <Navbar />
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/Training Session" component={TrainingSession}></Route>
          <Route path="/squad/manage-squad" component={GameSquad}></Route>
          <Route path="/Squad" component={Squad}></Route>
          <Route path="/Recruit" component={Recruit}></Route>
          <Route path="/evaluation-result" component={EvaluationResult}></Route>
          <Route path="/evaluation" component={Evaluation}></Route>
          <Route
            path="/Training Repo/Create Training"
            exact
            component={CreateTraining}
          ></Route>
          <Route
            path="/Training Repo/Create New Session"
            exact
            component={CreateNewSession}
          ></Route>
          <Route path="/Training Repo/:_id" component={Training}></Route>
          <Route path="/Training Repo" exact component={TrainingRepo}></Route>
          {/* <Route
            path="/Training Repo/Create Training"
            component={CreateTraining}
          ></Route>
          <Route
            path="/Training Repo/Create New Session"
            component={CreateNewSession}
          ></Route> */}
        </Switch>
      </main>
    </div>
  );
}

export default Root;
