import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, children, ...rest }) => {
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
