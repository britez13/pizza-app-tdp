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
import { Link, Outlet } from "react-router-dom";
import CreatePizzaForm from "./components/CreatePizzaForm";
import Navbar from "./components/Navbar";

function Home() {

  return (
    <>
      {/* <CreatePizzaForm /> */}
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;
