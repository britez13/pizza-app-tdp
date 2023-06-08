import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { GlobalStateContext } from "../contexts/globalStateContext"
import { useContext, useEffect } from 'react';
import { Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


function Navbar() {

  const [state, dispatch] = useContext(GlobalStateContext)

  // useEffect(() => {
  //   console.log(state);
  // }, [state.pizzas, state.auth, state.ingredientes])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
        <Link sx={{ color: "white"}} component={RouterLink} to="/">
          <Typography variant="h6">
            Pizza App
          </Typography>
          </Link>
          {
            state.auth && (<Stack >
            <Link sx={{ color: "white"}} component={RouterLink} to="/ingredientes">Mod. Ingr.</Link>
            <Link sx={{ color: "white"}} component={RouterLink} to="/pizzas">Crear/Editar Pizzas</Link>
            <Link sx={{ color: "white"}} component={RouterLink} to="/pizza_ingredient">Agregar/Eliminar Ingr. a Pizzas</Link>
          </Stack>)
          }
          { state.auth ? <Button color="inherit">Logout</Button> : <Button color="inherit">Login</Button>} 
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar