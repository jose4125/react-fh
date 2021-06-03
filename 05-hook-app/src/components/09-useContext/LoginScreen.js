import { useContext } from "react";
import { UserContext } from "./UserContext";

export const LoginScreen = () => {
  const { setUser } = useContext(UserContext);
  return (
    <div>
      <h1>login</h1>
      <hr />
      <button onClick={() => setUser({ id: 2, name: "jose" })}>Login</button>
    </div>
  );
};
