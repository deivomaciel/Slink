import React from "react";
import Home from "./Components/Home/Home"
import { Provider } from "react-redux"
import store from "./Components/store";
import { AppRoutes } from "./routes/AppRoutes";
import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  );
}

export default App;