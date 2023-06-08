import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { router } from "./routes.jsx";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { GlobalStateContext } from "./contexts/globalStateContext.jsx";
import { useContext, useEffect } from "react";

// Axios config
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {

  const [state, dispatch] = useContext(GlobalStateContext)

  useEffect(() => {
    const isUserAuth = localStorage.getItem("accessToken")
    dispatch({ type: "AUTH", payload: isUserAuth ? true : false})
    async function fetch() {
      try {
        const res = await axios.get("/pizzas");
        dispatch({ type: "FETCH_ALL_PIZZAS", payload: res.data});
        const res2 = await axios.get("/ingredientes");
        dispatch({ type: "FETCH_ALL_INGREDIENTES", payload: res2.data});
      } catch (error) {
        console.log(error);
      }
    }
    fetch()
  }, []);

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
