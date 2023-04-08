import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { persistor, store } from "./store";

function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </PersistGate>
  );
}

export default App;
