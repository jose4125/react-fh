import { Redirect, Route } from 'react-router-dom';
import { CustomRouteProps } from './interfaces';

const PublicRoute = ({
  isAuthenticated,
  children,
  ...rest
}: CustomRouteProps): JSX.Element => {
  return (
    <Route
      {...rest}
      render={() => {
        return !isAuthenticated ? children : <Redirect to="/" />;
      }}
    />
  );
};

export default PublicRoute;
