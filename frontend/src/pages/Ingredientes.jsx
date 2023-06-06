import { useEffect, useState } from "react";

import axios from 'axios';
// import {makeStyles} from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { Delete, Edit } from "@mui/icons-material";
// import {Edit, Delete} from '@mui/icons';



function Ingredientes() {
//   const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [ingredientes, setIngredientes] = useState(null);


  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    nombre: "",
    empresa: "",
    lanzamiento: "",
    unidades_vendidas: "",
  });

  useEffect(() => {
    async function fetchData() {
      const res2 = await axios.get("ingredientes");
      setIngredientes(res2.data);
     
    }

    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(consolaSeleccionada);
  };

  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };

  const peticionPost = async () => {
    await axios.post(baseUrl, consolaSeleccionada).then((response) => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    });
  };

  const peticionPut = async () => {
    await axios
      .put(baseUrl + consolaSeleccionada.id, consolaSeleccionada)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.id === consola.id) {
            consola.nombre = consolaSeleccionada.nombre;
            consola.lanzamiento = consolaSeleccionada.lanzamiento;
            consola.empresa = consolaSeleccionada.empresa;
            consola.unidades_vendidas = consolaSeleccionada.unidades_vendidas;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      });
  };

  const peticionDelete = async () => {
    await axios.delete(baseUrl + consolaSeleccionada.id).then((response) => {
      setData(data.filter((consola) => consola.id !== consolaSeleccionada.id));
      abrirCerrarModalEliminar();
    });
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

  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

//   useEffect(async () => {
//     await peticionGet();
//   }, []);

  const bodyInsertar = (
    <Box component={Paper} sx={{ maxWidth: "sm", width:"100%", bgcolor:"white", p:5}}>
      <Typography variant="h5" sx={{ textAlign: "center", mb:2 }}>Agregar nuevo ingrediente</Typography>
      <TextField
        name="nombre"
        // className={styles.inputMaterial}
        sx={{ width:"100%" }}
        label="Nombre"
        onChange={handleChange}
      />
      <br />
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
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyEditar = (
    <div >
      <h3>Editar Consola</h3>
      <TextField
        name="nombre"
        // className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.nombre}
      />
      <br />
      <TextField
        name="empresa"
        // className={styles.inputMaterial}
        label="Empresa"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.empresa}
      />
      <br />
      <TextField
        name="lanzamiento"
        // className={styles.inputMaterial}
        label="Lanzamiento"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.lanzamiento}
      />
      <br />
      <TextField
        name="unidades_vendidas"
        // className={styles.inputMaterial}
        label="Unidades Vendidas"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.unidades_vendidas}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div >
      <p>
        Estás seguro que deseas eliminar la consola{" "}
        <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  return (
    <div>
      <br />
      <Button sx={{mx:"auto"}} onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
      <br />
      <br />
      <TableContainer sx={{ bgcolor:"white", maxWidth: "md", mx: "auto" }}>
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
                  <Edit
                    // className={styles.iconos}
                    onClick={() => seleccionarConsola(consola, "Editar")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Delete
                    // className={styles.iconos}
                    onClick={() => seleccionarConsola(consola, "Eliminar")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal sx={{ display: "grid", placeItems:"center" }} open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default Ingredientes;
