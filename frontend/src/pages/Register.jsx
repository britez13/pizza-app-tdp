import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link component={RouterLink} to={"/"} variant="body2">Pizza App</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const [selectedValue, setSelectedValue] = useState("normal")
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(!data.get("username") || !data.get("password")) {
      alert("Por favor complete los campos para registrarse")
      return
    }
    const userData = {
      username: data.get("username"),
      password: data.get("password"),
      tipo: selectedValue.toLowerCase()
    };
    try {
      const res = await axios.post("/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/pizza3.avif)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear cuenta
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required={true}
                fullWidth
                id="username"
                label="Nombre de usuario"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                // required={true}
                InputLabelProps={{ required: true }}
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <InputLabel sx={{ mb: "2px" }} id="demo-simple-select-label">Tipo de usuario</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue}
                label="Tipo"
                onChange={ (e) => setSelectedValue(e.target.value) }
              >
                <MenuItem value={"normal"}>Normal</MenuItem>
                <MenuItem value={"staff"}>Staff</MenuItem>
              </Select>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={RouterLink} to={"/login"}>
                    {"¿Ya tiene una cuenta? Iniciar sesión"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
