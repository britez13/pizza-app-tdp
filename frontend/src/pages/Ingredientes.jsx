import { useState } from "react";

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
import { useGlobalStateContext } from "../hooks/useGlobalStateContext";

function Ingredientes() {
  const [selectedCategoria, SetSelectedCategoria] = useState({
    insert: "básico",
    edit: "básico"
  });
  const [selectedIngredienteNombre, setSelectedIngredienteNombre] =
    useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [itemBeingUsed, setItemBeingUsed] = useState({})

  const [state, dispatch] = useGlobalStateContext();

  const handleInsertar = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formatedData = {
      nombre: data.get("nombre"),
      categoria: selectedCategoria.insert,
    };
    console.log(formatedData);
    try {
      const res = await axios.post("/ingredientes", formatedData);
      dispatch({ type: "ADD_INGREDIENTE", payload: res.data });
      setModalInsertar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditar = (e, item) => {
    setSelectedIngredienteNombre(item.nombre);
    setItemBeingUsed(item)
    setModalEditar(true);
  };

  const handleEliminar = (e, item) => {
    setItemBeingUsed(item)
    setModalEliminar(true)
  }

  const handleSaveEdit = async(e) => {
    e.preventDefault()
    // const formData = new FormData(e.currentTarget);
    const formatedData = { nombre: selectedIngredienteNombre, categoria: selectedCategoria.edit }
    try {
      const res = await axios.put(`/ingredientes/${itemBeingUsed.id}`, formatedData)
      dispatch({ type: "UPDATE_INGREDIENTE", payload: res.data })
      setModalEditar(false)
    } catch (error) {
      alert(error.response)
    }
    // console.log(formData.get("nombre"), selectedCategoria.edit);
  };

  const handleEliminarIngrediente = async() => {
    try {
      const res = await axios.delete(`/ingredientes/${itemBeingUsed.id}`)
      dispatch({ type: "DELETE_INGREDIENTE", payload: itemBeingUsed.id })
      setModalEliminar(false)
    } catch (error) {
      alert(error.response)
    }
  }

  const handleIngredienteNombreChange = (e) => {
    setSelectedIngredienteNombre(e.target.value)
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
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
            value={selectedCategoria.insert}
            label="Categoría"
            onChange={(e) => SetSelectedCategoria( prev => ({...prev, insert: e.target.value }) )}
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
    <Box
      component={Paper}
      sx={{ bgColor: "white", width: "90%", maxWidth: "sm", px: 4, py: 2 }}
    >
      <Typography sx={{ mb: 2, textAlign: "center" }} variant="h5">
        Editar ingrediente
      </Typography>
      <Box component="form" onSubmit={handleSaveEdit}>
        <TextField
          sx={{ width: "100%", mb: 2 }}
          name="nombre"
          label="Nombre"
          onChange={handleIngredienteNombreChange}
          value={selectedIngredienteNombre}
        />
        <FormControl sx={{ mt: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategoria.edit}
            label="Categoría"
            onChange={(e) => SetSelectedCategoria(prev => ({...prev, edit: e.target.value}))}
          >
            <MenuItem value={"básico"}>Básico</MenuItem>
            <MenuItem value={"premium"}>Premium</MenuItem>
          </Select>
        </FormControl>
        <Box align="right">
          <Button type="submit" color="primary">Editar</Button>
          <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
        </Box>
      </Box>
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
        <Button onClick={handleEliminarIngrediente}>Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: "grid", placeItems: "center", my: 2 }}>
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
            {state.ingredientes?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>
                  <Edit onClick={(e) => handleEditar(e, item)} />
                  &nbsp;&nbsp;&nbsp;
                  <Delete onClick={(e) => handleEliminar(e, item)} />
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

      <Modal
        sx={{ display: "grid", placeItems: "center" }}
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
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
