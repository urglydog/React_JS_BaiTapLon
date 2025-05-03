import "./App.css";
import AppRouter from "./router/AppRouter";
import { Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import ToastNotification from "./components/option/ToastNotification";
function App() {
  return (
    <div>
      <UserProvider>
      <Provider store={store}>
          <ToastNotification />
          <AppRouter />
        </Provider>
      </UserProvider>
    </div>
  );
}

export default App;
