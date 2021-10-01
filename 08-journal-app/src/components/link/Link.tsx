import { Link as LinkDom } from 'react-router-dom';

interface LinkProps {
  to: string;
  className?: string;
  children: JSX.Element | string;
}

const Link = ({ to, children, className }: LinkProps): JSX.Element => (
  <LinkDom className={className} to={to}>
    {children}
  </LinkDom>
);

export default Link;
