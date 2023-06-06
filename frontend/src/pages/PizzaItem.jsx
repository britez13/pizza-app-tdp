import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import styled from "@emotion/styled";

function PizzaItem() {
  const [pizza, setPizza] = useState(null);
  const { id } = useParams();

  const StyledCard = styled(Card)({
    maxWidth: 400,
    margin: "0 auto",
    marginTop: 20,
  });

  const StyledMedia = styled(CardMedia)({
    height: 0,
    paddingTop: "56.25%", // 16:9 aspect ratio
  });

  const StyledContent = styled(CardContent)({
    textAlign: "center",
  });

  useEffect(() => {
    async function fetctPizza() {
      const res = await axios.get(`pizzas/${id}`);
      // console.log(res.data);
      setPizza(res.data[0]);
      // console.log(res);
    }
    fetctPizza();
  }, []);

  return (
    //

    pizza && <StyledCard>
      <StyledMedia image={"/pizza_card.webp"} title={pizza.nombre} />
      <StyledContent>
        <Typography variant="h5" component="div">
          {pizza.nombre}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Precio: {pizza.precio}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Estado: {pizza.estado}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Ingredientes:
        </Typography>
        {/* <ul>
          {pizza.Ingredientes?.map((ingrediente, index) => (
            <li key={index}>{ingrediente}</li>
          ))}
        </ul> */}
      </StyledContent>
    </StyledCard>
  );
}

export default PizzaItem;
