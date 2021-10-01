import { useEffect, useState } from 'react';
import { firebase } from '../firebase/firebase-config';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import AuthRouter from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../auth/authActions';
import JournalScreen from '../journalScreen/JournalScreen';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isGettingUserInfo, setIsGettingUserInfo] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user?.uid) {
        dispatch(login({ uid: user.uid, displayName: user.displayName }));
        setIsAuthenticated(true);
      }

      if (!user?.uid) {
        setIsAuthenticated(false);
      }
      setIsGettingUserInfo(false);
    });
  }, [dispatch, setIsGettingUserInfo, setIsAuthenticated]);

  if (isGettingUserInfo) {
    return <h1>Getting info...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute isAuthenticated={isAuthenticated} exact path="/">
            <JournalScreen />
          </PrivateRoute>
          <PublicRoute isAuthenticated={isAuthenticated} path="/auth">
            <AuthRouter />
          </PublicRoute>
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
