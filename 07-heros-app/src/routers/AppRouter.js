import { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import DashboardRouter from "./DashboardRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LoginScreen from "../components/login/LoginScreen";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute isAuthenticated={user.logged} exact path="/login">
            <LoginScreen />
          </PublicRoute>
          <PrivateRoute isAuthenticated={user.logged} path="/">
            <DashboardRouter />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
