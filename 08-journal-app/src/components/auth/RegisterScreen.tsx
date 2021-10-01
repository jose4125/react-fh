import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import Link from '../link/Link';
import Button from '../button/Button';
import { useForm } from '../hooks/useForm';
import { starRegisterWithNameEmailPassword } from './authActions';

const RegisterScreen = (): JSX.Element => {
  const [formError, setFormError] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { formState, handleInputChange } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formState;

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid()) {
      dispatch(starRegisterWithNameEmailPassword({ email, password, name }));
    }
  };

  const isFormValid = () => {
    let errorMessage: string[] = [];

    if (name.trim().length === 0) {
      errorMessage = [...errorMessage, 'Name is required'];
    }

    if (email.trim().length === 0) {
      errorMessage = [...errorMessage, 'Email is required'];
    }

    if (!validator.isEmail(email)) {
      errorMessage = [...errorMessage, 'Email is not valid'];
    }

    if (
      password.trim().length === 0 ||
      password.trim() !== confirmPassword.trim()
    ) {
      errorMessage = [
        ...errorMessage,
        'password and confirmPassword are required and should be the same',
      ];
    }

    if (errorMessage.length) {
      setFormError(errorMessage);
      return false;
    }

    setFormError([]);

    return true;
  };

  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <h3 className="auth__title">Register</h3>
      <form
        onSubmit={handleRegisterSubmit}
        noValidate
        data-test="register-form"
      >
        {formError.length > 0 && (
          <div className="auth__alert-error">
            {formError.map(error => (
              <p key={error} data-test="register-error">
                {error}
              </p>
            ))}
          </div>
        )}
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
          data-test="register-name"
        />
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
          data-test="register-email"
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
          data-test="register-password"
        />
        <input
          className="auth__input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="off"
          value={confirmPassword}
          onChange={handleInputChange}
          data-test="register-confirm-password"
        />
        <Button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </Button>
        <Link className="link" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </div>
  );
};

export default RegisterScreen;
