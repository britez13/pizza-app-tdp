import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
export const Pizzas = () => {
    const data = [
        { nombre: 'Product 1', precio: 10, tipo: 'Type A', ingredientes: ['Ingredient 1', 'Ingredient 2'] },
        { nombre: 'Product 2', precio: 20, tipo: 'Type B', ingredientes: ['Ingredient 3', 'Ingredient 4', 'Ingredient 5'] },
        // Add more data as needed
      ];


      
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Ingredientes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.precio}</TableCell>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>
                  <ul>
                    {item.ingredientes.map((ingrediente, i) => (
                      <li key={i}>{ingrediente}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    
      
    );
  };
  