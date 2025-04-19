import "./App.css";
import AppRouter from "./router/AppRouter";
import { Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </div>
  );
}

export default App;
