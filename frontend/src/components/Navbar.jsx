import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { GlobalStateContext } from "../contexts/globalStateContext"
import { useContext } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
        <Link sx={{ color: "white"}} component={RouterLink} to="/">
          <Typography variant="h6">
            Pizza App
          </Typography>
          </Link>
          <Box>
            <Link sx={{ color: "white"}} component={RouterLink} to="/ingredientes">Ingredientes</Link>
            <Link sx={{ color: "white", ml:1}} component={RouterLink} to="/Pizzas">Pizzas</Link>
          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar