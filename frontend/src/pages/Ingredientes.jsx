import { useEffect, useState } from "react";

import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function Ingredientes() {
  const [selectedCategoria, SetSelectedCategoria] = useState("básico");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [ingredientes, setIngredientes] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res2 = await axios.get("ingredientes");
      setIngredientes(res2.data);
    }

    fetchData();
  }, []);

  const handleInsertar = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("nombre"), selectedCategoria);
  };

  const handleChange = (e) => {
    console.log(e);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const bodyInsertar = (
    <Box
      component={Paper}
      sx={{ maxWidth: "sm", width: "90%", bgcolor: "white", p: 5 }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Agregar nuevo ingrediente
      </Typography>
      <Box component="form" onSubmit={handleInsertar}>
        <TextField name="nombre" sx={{ width: "100%" }} label="Nombre" />
        <br />
        <FormControl sx={{ mt: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategoria}
            label="Categoría"
            onChange={(e) => SetSelectedCategoria(e.target.value)}
          >
            <MenuItem value={"básico"}>Básico</MenuItem>
            <MenuItem value={"premium"}>Premium</MenuItem>
          </Select>
        </FormControl>
        <br />
        <div align="right">
          <Button type="submit" color="primary">
            Insertar
          </Button>
          <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </Box>
    </Box>
  );

  const bodyEditar = (
    <Box component={Paper} sx={{ bgColor:"white", width:"90%", maxWidth:"sm", px: 4, py:2 }} >
      <Typography sx={{ mb: 2, textAlign: "center"}} variant="h5">Editar ingrediente</Typography>
      <TextField
        sx={{ width: "100%", mb:2 }}
        name="nombre"
        label="Nombre"
        onChange={handleChange}
  //       value={consolaSeleccionada && consolaSeleccionada.nombre}
      /> 
      <FormControl sx={{ mt: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategoria}
            label="Categoría"
            onChange={(e) => SetSelectedCategoria(e.target.value)}
          >
            <MenuItem value={"básico"}>Básico</MenuItem>
            <MenuItem value={"premium"}>Premium</MenuItem>
          </Select>
        </FormControl>
      <div align="right">
        <Button color="primary">
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyEliminar = (
    <Box
      component={Paper}
      sx={{
        display: "grid",
        placeItems: "center",
        maxWidth: "sm",
        width: "100%",
        bgcolor: "white",
        p: 5,
      }}
    >
      <Typography>
        ¿Estás seguro que desea eliminar este ingrediente?
      </Typography>
      <Box mt={1}>
        <Button color="secondary">Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display:"grid", placeItems:"center", my: 2 }}>
      <Button sx={{ mx: "auto" }} onClick={() => abrirCerrarModalInsertar()}>
        Insertar
      </Button>
      </Box>
      
      <TableContainer sx={{ bgcolor: "white", maxWidth: "sm", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Editar/Eliminar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ingredientes?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>
                  <Edit onClick={() => setModalEditar(true)} />
                  &nbsp;&nbsp;&nbsp;
                  <Delete onClick={() => setModalEliminar(true)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        sx={{ display: "grid", placeItems: "center" }}
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {bodyInsertar}
      </Modal>

      <Modal sx={{ display: "grid", placeItems: "center" }} open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal
        sx={{ display: "grid", placeItems: "center" }}
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default Ingredientes;
