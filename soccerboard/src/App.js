// import logo from './logo.svg';
import "./App.css";
import Navbar from "./components/navbar.jsx";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home";
import TrainingSession from "./components/trainingSession";
import TrainingRepo from "./components/trainingRepo";
import Recruit from "./components/recruit";
import Squad from "./components/squad";

function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/Training Session" component={TrainingSession}></Route>
          <Route path="/Squad" component={Squad}></Route>
          <Route path="/Recruit" component={Recruit}></Route>
          <Route path="/Training Repo" component={TrainingRepo}></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
