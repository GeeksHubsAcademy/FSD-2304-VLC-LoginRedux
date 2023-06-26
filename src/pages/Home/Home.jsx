import React from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Home = () => {
  const { credentials, data } = useSelector(userData);
  return (
    <>
      {credentials?.token ? (
        <div>¡Hola, {data.name}!</div>
      ) : (
        <div>Bienvenido</div>
      )}
    </>
  );
};
