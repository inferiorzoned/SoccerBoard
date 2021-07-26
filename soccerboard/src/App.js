// import logo from './logo.svg';
import "./styles/css/App.css";
import { Route, Switch } from "react-router-dom";
import ApplicationForm from "./components/applicationForm";
import ApplicationStatusForm from "./components/applicationStatusForm";
import Login from "./pages/login";
import Root from "./components/root";
import auth from "./services/authService";

function App() {
  const user = auth.getCurrentUser();
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

          {user ? <Root /> : <Route path="/" exact component={Login}></Route>}
        </Switch>
      </main>
    </div>
  );
}

export default App;
