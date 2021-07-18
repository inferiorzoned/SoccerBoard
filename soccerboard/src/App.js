// import logo from './logo.svg';
import "./styles/css/App.css";
import { Route, Switch } from "react-router-dom";
import ApplicationForm from "./components/applicationForm";
import ApplicationStatusForm from "./components/applicationStatusForm";
import Login from "./pages/login";
import Root from "./components/root";

function App() {
  return (
    <div>
      <main className="App">
        <Switch>
          <Route
            path="/application-status"
            component={ApplicationStatusForm}
          ></Route>
          <Route path="/" exact component={Login}></Route>
          <Route path="/application" component={ApplicationForm}></Route>
          <Root />
        </Switch>
      </main>
    </div>
  );
}

export default App;
