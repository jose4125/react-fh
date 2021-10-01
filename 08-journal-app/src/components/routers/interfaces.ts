import { RouteProps } from 'react-router-dom';

export interface CustomRouteProps extends RouteProps {
  isAuthenticated: boolean;
}
