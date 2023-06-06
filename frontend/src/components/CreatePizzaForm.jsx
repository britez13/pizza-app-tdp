import {
  Container,
  Stack,
  List,
  ListItem,
  Box,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
axios



function CreatePizzaForm() {

  const [ingredientes, setIngredientes] = useState(null)

  useEffect(() => {
    async function fetchData() {
      // const res = await axios.get("pizzas");
      // setPizzas(res.data);
      const res2 = await axios.get("ingredientes")
      setIngredientes(res2.data)
    }

    fetchData();
  }, []);

  return (
    <Container sx={{ mb: 3}}>
      <Box>
        <Typography variant="h2">Crear Pizza</Typography>
        <TextField id="standard-basic" label="Nombre" variant="standard" />
        <TextField id="standard-basic" label="Precio" variant="standard" />
        <FormControl sx={{ mt:2 }} fullWidth>
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"activo"}
          label="Estado"
          // onChange={handleChange}
        >
          <MenuItem value={"activo"}>Activo</MenuItem>
          <MenuItem value={"inactivo"}>Inactivo</MenuItem>
        </Select>
        </FormControl>

        <FormControl fullWidth>
        <InputLabel id="demo2-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo2-simple-select-label"
          id="demo2-simple-select"
          value={""}
          label="Ingredientes"
          // onChange={handleChange}
        >
          {ingredientes?.map((item) => (
            <MenuItem
              key={item.id}
              value={item.nombre}
              // style={getStyles(name, personName, theme)}
            >
              {item.nombre}
            </MenuItem>
          ))}
        </Select>
        <Button variant="outlined">Guardar Pizza</Button>
      </FormControl>
      </Box>
      </Container>
  )
}

export default CreatePizzaForm