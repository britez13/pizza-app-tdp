import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Container,
  Stack,
  List,
  ListItem,
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [ingredientes, setIngredientes] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("pizzas");
      setPizzas(res.data);
      const res2 = await axios.get("ingredientes");
      setIngredientes(res2.data);
     
    }

    fetchData();
  }, []);

  return (
    <>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "40px",
          textAlign: "center",
          mt: 2,
        }}
        variant="h1"
      >
        Pizzas
      </Typography>
      <Container maxWidth="lg">
        <List
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "repeat(3, 1fr)" },
          }}
        >
          {pizzas.length
            ? pizzas.map((pizza) => (
                <Link key={pizza.id} to={`/pizzas/${pizza.id}`}>
                  <ListItem>
                    <Card sx={{ width: "100%" }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="/pizza_card.webp"
                        title="Pizza"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {pizza.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Estado: {pizza.estado}
                        </Typography>
                      </CardContent>
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>
                          Ingredientes cant.: {pizza.cantidad}{" "}
                        </Typography>
                        <Typography>Precio: {pizza.precio}$ </Typography>
                      </CardContent>
                    </Card>
                  </ListItem>
                </Link>
              ))
            : "Nothing here"}
        </List>
      </Container>
    </>
  );
}

export default PizzaList;
