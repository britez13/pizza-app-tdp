import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useGlobalStateContext } from '../hooks/useGlobalStateContext';

const PizzaIngredients = () => {
  const initialPizzas = [
    { id: 1, nombre: 'Margherita', ingredients: ['Tomato Sauce', 'Mozzarella'] },
    { id: 2, nombre: 'Pepperoni', ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni'] },
    { id: 3, nombre: 'Vegetarian', ingredients: ['Tomato Sauce', 'Mozzarella', 'Bell Pepper', 'Mushrooms'] }
  ];

  const initialIngredients = [
    'Tomato Sauce',
    'Mozzarella',
    'Pepperoni',
    'Bell Pepper',
    'Mushrooms',
    'Olives',
    'Onions'
  ];

  const [state, dispatch] = useGlobalStateContext()

  const [pizzas, setPizzas] = useState(initialPizzas);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [currentPizza, setCurrentPizza] = useState({});
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleAddIngredient = (pizza) => {
    setCurrentPizza(pizza);
    setOpenAddDialog(true);
  };

  const handleSaveIngredient = () => {
    const updatedPizzas = pizzas.map((pizza) =>
      pizza.id === currentPizza.id
        ? { ...pizza, ingredients: [...pizza.ingredients, selectedIngredient] }
        : pizza
    );
    setPizzas(updatedPizzas);
    setOpenAddDialog(false);
    setSelectedIngredient('');
  };

  const handleDeleteIngredient = (pizza, ingredient) => {
    setCurrentPizza(pizza);
    setSelectedIngredient(ingredient);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDeleteIngredient = () => {
    const updatedPizzas = pizzas.map((pizza) =>
      pizza.id === currentPizza.id
        ? { ...pizza, ingredients: pizza.ingredients.filter((item) => item !== selectedIngredient) }
        : pizza
    );
    setPizzas(updatedPizzas);
    setOpenDeleteDialog(false);
    setSelectedIngredient('');
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pizza</TableCell>
              <TableCell>Ingredientes</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pizzas.map((pizza) => (
              <TableRow key={pizza.id}>
                <TableCell>{pizza.nombre}</TableCell>
                <TableCell>
                  <ul>
                    {ingredients.map((ingredient) => (
                      <li key={ingredient}>
                        {ingredient}
                        <Button
                          size="small"
                          onClick={() => handleDeleteIngredient(pizza, ingredient)}
                          style={{ marginLeft: '8px' }}
                        >
                          Eliminar
                        </Button>
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddIngredient(pizza)}
                    style={{ marginRight: '8px' }}
                  >
                    Agregar ingrediente
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar ingrediente</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="ingredient-select-label">Ingrediente</InputLabel>
            <Select
              labelId="ingredient-select-label"
              id="ingredient-select"
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
            >
              {ingredients.map((ingredient) => (
                <MenuItem key={ingredient} value={ingredient}>
                  {ingredient}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveIngredient} disabled={!selectedIngredient}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Eliminar Ingrediente</DialogTitle>
        <DialogContent>
          <p>Está seguro que desea elininar este ingrediente?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDeleteIngredient} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PizzaIngredients;

