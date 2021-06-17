// import logo from './logo.svg';
import "./styles/css/App.css";
import Navbar from "./components/navbar.jsx";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import TrainingSession from "./pages/trainingSession";
import TrainingRepo from "./pages/trainingRepo";
import Recruit from "./pages/recruit";
import Squad from "./pages/squad";
import CreateTraining from "./pages/createTraining";
import ApplicationForm from "./components/applicationForm";
import ApplicationStatusForm from "./components/applicationStatusForm";
import Login from "./login";
import Root from "./components/root";

function App() {
  return (
    <div>
      <main className="App">
        {/* <Navbar /> */}
        <Switch>
          <Route
            path="/application-status"
            component={ApplicationStatusForm}
          ></Route>
          <Route path="/" exact component={Login}></Route>
          <Route path="/application" component={ApplicationForm}></Route>
          {/* <Route path="/home" component={Home}></Route>
          <Route path="/Training Session" component={TrainingSession}></Route>
          <Route path="/Squad" component={Squad}></Route>
          <Route path="/Recruit" component={Recruit}></Route>
          <Route path="/Training Repo" exact component={TrainingRepo}></Route>
          <Route
            path="/Training Repo/Create Training"
            component={CreateTraining}
          ></Route> */}
          <Root />
        </Switch>
      </main>
    </div>
  );
}

export default App;
