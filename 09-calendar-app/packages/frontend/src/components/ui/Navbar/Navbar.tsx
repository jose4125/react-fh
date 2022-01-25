import { ReactElement } from 'react';

export const Navbar = (): ReactElement => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Pedro</span>
      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt" /> <span>salir</span>
      </button>
    </div>
  );
};
