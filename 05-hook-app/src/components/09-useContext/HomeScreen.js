import { useContext } from "react";
import { UserContext } from "./UserContext";

export const HomeScreen = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>home</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
