import { Redirect, Route } from 'react-router-dom';
import { CustomRouteProps } from './interfaces';

const PrivateRoute = ({
  isAuthenticated,
  children,
  ...rest
}: CustomRouteProps): JSX.Element => {
  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to="/auth/login" />;
      }}
    />
  );
};

export default PrivateRoute;
