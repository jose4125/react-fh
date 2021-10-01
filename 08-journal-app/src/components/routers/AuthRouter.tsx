import { Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';

const AuthRouter = (): JSX.Element => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route exact path="/auth/login">
            <LoginScreen />
          </Route>
          <Route exact path="/auth/register">
            <RegisterScreen />
          </Route>
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};

export default AuthRouter;
