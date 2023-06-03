import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import axios from "axios"

// Axios config
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

// Rutas y sus páginas/componentes a renderizar
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
