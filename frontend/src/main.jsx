import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { StateContextProvider } from "./contexts/globalStateContext.jsx";
import { router } from "./routes.jsx";
import "./style.css";


// Axios config
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <StateContextProvider>
      <RouterProvider router={router} />
    </StateContextProvider>
  </React.StrictMode>
);
