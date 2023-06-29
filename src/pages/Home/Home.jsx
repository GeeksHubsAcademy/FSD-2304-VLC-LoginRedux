import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../common/InputText/InputText";
import { createAppt } from "../../services/apiCalls";

export const Home = () => {
  const { credentials, data } = useSelector(userData);
  const navigate = useNavigate();
  const [body, setBody] = useState({});
  const [bodyError, setBodyError] = useState({});

  const inputHandler = ({ target }) => {
    let { name, value } = target;
    setBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = () => {
    createAppt(body, credentials.token).then((res) => console.log(res));
  };

  
  useEffect(() => {
    if (body.date) {
      body.fullDate = `${body.date}T${body.time}`;
    } else if (body.date && body.time) {
      body.date = `${body.date}`;
      body.fullDate = `${body.date}T${body.time}`;
      body.time = "";
    }

  }, [body.date, body.time]);

  
  return (
    <>
      {credentials?.token ? (
        <>
          <div>¡Hola, {data.name}!</div>

          <Button onClick={() => navigate("/characters")}>
            VER PERSONAJES
          </Button>
          <Button onClick={() => navigate("/books")}>VER LIBROS</Button>

          <div>COGER CITA</div>
          <InputText
            type={"text"}
            design={""}
            placeholder={"Diga el motivo de su visita"}
            name={"description"}
            state={setBody}
            errorState={setBodyError}
          />
          {/* <input type="datetime-local" name="date" onChange={(e)=>inputHandler(e)}/> */}

          <input
            type="date"
            name="date"
            onChange={(e) => inputHandler(e)}
          />
          <input
            type="time"
            name="time"
            list="time_list"
            onBlur={(e) => inputHandler(e)}
          />
          <datalist id="time_list">
            <option value="09:00" />
            <option value="09:30" />
            <option value="10:00" />
            <option value="10:30" />
            <option value="11:00" />
          </datalist>

          <Button onClick={() => submitHandler()}>COGER CITA</Button>
        </>
      ) : (
        <div>Bienvenido</div>
      )}
    </>
  );
};
