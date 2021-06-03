import { AuthContextProvider } from "./auth/AuthContext";
import AppRouter from "./routers/AppRouter";

const App = () => {
  return (
    <AuthContextProvider>
      <AppRouter />;
    </AuthContextProvider>
  );
};

export default App;
