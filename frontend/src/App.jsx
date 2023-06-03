import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from "react-router-dom";

function App() {

  useEffect( () => {
    async function fetchData() {
      const res = await axios.get("pizzas")
      console.log(res);
    }

    fetchData()
    
  })
  
  return (
    <>
    <h1>Hello</h1>
    <Link to="login">Login</Link>
    </>
  )
}

export default App
