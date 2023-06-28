import React from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { credentials, data } = useSelector(userData);
  const navigate = useNavigate()
  return (
    <>
      {credentials?.token ? (
        <>
        <div>¡Hola, {data.name}!</div>

        <Button onClick={()=>navigate("/characters")}>VER PERSONAJES</Button>
        <Button onClick={()=>navigate("/books")}>VER LIBROS</Button>
        </>

      ) : (
        <div>Bienvenido</div>
      )}
    </>
  );
};
