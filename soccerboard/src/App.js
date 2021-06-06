// import logo from './logo.svg';
import "./App.css";
import Navbar from "./components/navbar.jsx";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import TrainingSession from "./pages/trainingSession";
import TrainingRepo from "./pages/trainingRepo";
import Recruit from "./pages/recruit";
import Squad from "./pages/squad";
import CreateTraining from "./pages/createTraining";

function App() {
  return (
    <div>
      <main className="App">
        <Navbar />
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/Training Session" component={TrainingSession}></Route>
          <Route path="/Squad" component={Squad}></Route>
          <Route path="/Recruit" component={Recruit}></Route>
          <Route path="/Training Repo/Create Training" component={CreateTraining}></Route>
          <Route path="/Training Repo" exact component={TrainingRepo}></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
