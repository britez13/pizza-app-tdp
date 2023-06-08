import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Modal,
  Typography,
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalStateContext } from "../hooks/useGlobalStateContext";
import axios from "axios";

const PizzaList = () => {
  const [state, dispatch] = useGlobalStateContext();

  const [selectedEstado, setSelectedEstado] = useState("activo");
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [currentPizza, setCurrentPizza] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleFieldChange = (field, value) => {
    setCurrentPizza((prevPizza) => ({
      ...prevPizza,
      [field]: value,
    }));
  };

  const handleAddPizza = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await axios.post("/pizzas", {
        nombre: formData.get("nombre"),
        precio: parseInt(formData.get("precio")),
        estado: selectedEstado,
      });
      dispatch({ type:"ADD_PIZZA", payload: res.data })
      setSelectedEstado("activo");
      setModalAddOpen(false);
    } catch (error) {
      console.log(error);
      setModalAddOpen(false);
      setSelectedEstado("activo");
    }
  };
  0;
  const handleEditPizza = (pizza) => {
    setCurrentPizza(pizza);
    setModalEditOpen(true);
  };

  const handleSavePizza = async () => {
    const data = {
      nombre: currentPizza.nombre,
      precio: parseInt(currentPizza.precio),
      estado: currentPizza.estado,
    };
    try {
      const res = await axios.put(`/pizzas/${currentPizza.id}`, data);
      console.log(res.data);
      dispatch({ type: "UPDATE_PIZZA", payload: res.data });
      setModalEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePizza = (pizza) => {
    setCurrentPizza(pizza);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = axios.delete(`/pizzas/${currentPizza.id}`);
      dispatch({ type: "DELETE_PIZZA", payload: currentPizza.id });
      setConfirmDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setCurrentPizza({});
    setModalAddOpen(false);
    setModalEditOpen(false);
    setConfirmDelete(false);
  };

  return (
    <>
      <Box sx={{ my: 2, display: "grid", placeItems: "center" }}>
        <Button onClick={() => setModalAddOpen(true)}>Crear Pizza</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.pizzas?.map((pizza) => (
              <TableRow key={pizza.id}>
                <TableCell>{pizza.nombre}</TableCell>
                <TableCell>{pizza.precio}</TableCell>
                <TableCell>{pizza.estado}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditPizza(pizza)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeletePizza(pizza)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        sx={{ display: "grid", placeItems: "center", py: 2, px: 1 }}
        open={modalAddOpen}
        onClose={handleCloseModal}
      >
        <Box
          sx={{ px: 2, py: 2, width: "90%", maxWidth: "sm" }}
          bgcolor={"white"}
        >
          <Typography sx={{ textAlign: "center", mb: 1 }} variant="h5">
            Agregar Pizza
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddPizza}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField label="Nombre" name="nombre" />
            <TextField label="Precio" name="precio" />
            <Box>
              <InputLabel sx={{ mb: "2px" }} id="demo-simple-select-label">
                Estado
              </InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
              >
                <MenuItem value={"activo"}>Activo</MenuItem>
                <MenuItem value={"inactivo"}>Inactivo</MenuItem>
              </Select>
            </Box>
            <Button type="submit" variant="contained">
              Agregar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        sx={{ display: "grid", placeItems: "center", py: 2, px: 1 }}
        open={modalEditOpen}
        onClose={handleCloseModal}
      >
        <Box
          sx={{ px: 2, py: 2, width: "90%", maxWidth: "sm" }}
          bgcolor={"white"}
        >
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Editar Pizza
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nombre"
              value={currentPizza.nombre || ""}
              onChange={(e) => handleFieldChange("nombre", e.target.value)}
            />
            <TextField
              label="Precio"
              value={currentPizza.precio || ""}
              onChange={(e) => handleFieldChange("precio", e.target.value)}
            />
            <TextField
              label="Estado"
              value={currentPizza.estado || ""}
              onChange={(e) => handleFieldChange("estado", e.target.value)}
            />
            <Button variant="contained" onClick={handleSavePizza}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        sx={{ display: "grid", placeItems: "center", py: 2, px: 1 }}
        open={confirmDelete}
        onClose={handleCloseModal}
      >
        <Box
          sx={{
            px: 2,
            py: 2,
            width: "90%",
            maxWidth: "sm",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          bgcolor={"white"}
        >
          <Typography variant="h5">Confirma para eliminar</Typography>
          <Typography>Está seguro que desea eliminar esta pizza?</Typography>
          <Button variant="contained" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PizzaList;
