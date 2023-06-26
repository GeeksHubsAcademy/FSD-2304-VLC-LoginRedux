import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { charData } from "../Characters/charSlice";
import { getOneCharacter } from "../../services/apiCalls";

export const Detail = () => {
  let character = useSelector(charData);
  let charId = character.id;

let [char, setChar] = useState({})

  useEffect(()=>{
    getOneCharacter(charId)
    .then(char => setChar(char))
  },[])
  return (
    <>
      {char?.name}
      {char?.status}
      {char?.location?.name}
      <img src={char?.image}></img>
     
    </>
  );
};
