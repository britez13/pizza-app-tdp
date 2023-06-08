import React from "react";
import ReactDOM from "react-dom/client";
import StateContextProvider  from "./contexts/globalStateContext.jsx";
import App from "./App.jsx";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateContextProvider>
    <App />
    </StateContextProvider>
  </React.StrictMode>
);
