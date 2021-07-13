import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, children, ...rest }) => {
  localStorage.setItem("lastPath", rest.location.pathname);

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
