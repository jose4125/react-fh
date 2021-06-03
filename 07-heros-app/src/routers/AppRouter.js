import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "../components/login/LoginScreen";
import DashboardRouter from "./DashboardRouter";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
            <LoginScreen />
          </Route>
          <Route path="/">
            <DashboardRouter />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
