import { createBrowserRouter } from "react-router-dom";
import Home from './App.jsx'
import PizzaList from "./pages/PizzaList.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import PizzaItem from "./pages/PizzaItem.jsx"
import Ingredientes from './pages/Ingredientes.jsx';
import { Pizzas } from './pages/Pizzas.jsx';

// Rutas y sus páginas/componentes a renderizar
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "",
          element: <PizzaList />,
        },
        {
          path: "pizzas/:id",
          element: <PizzaItem />,
        },
        {
          path: "ingredientes",
          element: <Ingredientes />,
        },
        {
          path: "pizzas",
          element: <Pizzas />,
        },
      ]
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