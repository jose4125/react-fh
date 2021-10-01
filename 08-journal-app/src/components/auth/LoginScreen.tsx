import { RootState } from '../utils/types';
import Link from '../link/Link';
import Button from '../button/Button';
import { useForm } from '../hooks/useForm';
import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoginEmailPassword, startLogingWithGoogle } from './authActions';

const LoginScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ ui }: RootState) => ui);
  const { formState, handleInputChange } = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formState;

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleLoginWithGoogle = () => {
    dispatch(startLogingWithGoogle());
  };

  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin} noValidate data-test="login-form">
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
        />
        <Button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={loading}
        >
          Login
        </Button>
      </form>
      <hr />
      <div className="auth__social-networks">
        <p className="mb-1">Login with social network</p>
        <Button
          className="google-btn"
          onClick={handleLoginWithGoogle}
          data-test="login-with-google"
        >
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google button"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </Button>
      </div>
      <Link className="link" to="/auth/register">
        Create new account
      </Link>
    </div>
  );
};

export default LoginScreen;
