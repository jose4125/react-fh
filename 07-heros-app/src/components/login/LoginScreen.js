import { useHistory } from "react-router-dom";

const LoginScreen = () => {
  let history = useHistory();
  const handleLogin = () => {
    console.log("login");
    history.replce("/");
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginScreen;
