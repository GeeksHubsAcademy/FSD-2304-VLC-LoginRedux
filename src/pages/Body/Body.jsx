import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Characters } from "../Characters/Characters";
import { Detail } from "../Detail/Detail";
import { Books } from "../Books/Books";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </>
  );
};
