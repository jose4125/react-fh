import { createContext, useReducer } from "react";
import { authReducer } from "./authReducer";

export const AuthContext = createContext();

const init = () => {
  return JSON.parse(localStorage.getItem("user")) ?? { logged: false };
};

export const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
