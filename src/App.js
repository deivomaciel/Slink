import React from "react";
import { Provider } from "react-redux"
import store from "./Components/store";
import AppRoutes from "./routes/AppRoutes";
import Analytics from "./Components/Analytics/Analytics";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRoutes />
        <Analytics />
      </Provider>
    </div>
  );
}

export default App;