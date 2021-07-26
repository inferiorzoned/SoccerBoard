import Navbar from "../components/navbar.jsx";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import TrainingRepo from "../pages/trainingRepo";
import Recruit from "../pages/recruit";
import Squad from "../pages/squad";
import CreateTraining from "../pages/createTraining";
import Training from "../pages/training";
import CreateNewSession from "../pages/createNewSession.jsx";
import GameSquad from "./gameSquad.jsx";
import Evaluation from "../pages/evaluation.jsx";
import EvaluationResult from "../pages/evaluationResult.jsx";
import Test from "../tests/test";
import ViewTrainingSession from "../pages/ViewTrainingSession.jsx";
import auth from "../services/authService.js";

function Root() {
  const user = auth.getCurrentUser();
  return (
    <div>
      <main className="App">
        <Navbar />
        <Switch>
          <Route path="/test" component={Test}></Route>
          <Route path="/home" component={Home}></Route>
          <Route
            path="/Training Session"
            component={ViewTrainingSession}
          ></Route>
          <Route path="/squad/game-squad" component={GameSquad}></Route>
          <Route path="/Squad" component={Squad}></Route>
          {user && (user.userType !== "player" || user.isAdmin) && (
            <Route path="/Recruit" component={Recruit}></Route>
          )}
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
        </Switch>
      </main>
    </div>
  );
}

export default Root;
