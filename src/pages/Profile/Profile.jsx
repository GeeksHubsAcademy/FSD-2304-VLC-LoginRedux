import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Button } from "react-bootstrap";
import { inputHandler } from "../../services/useful";

export const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState({});

  const datos = useSelector(userData);
  const token = datos?.credentials?.token;

//   useEffect(() => {
//     getProfile(token).then((res) => {
//       setUser(res.data);
//     });
//   }, []);

  const editHandler = (body, token) => {
    updateProfile(body, token)
      .then(setEditing(false));
  };

  useEffect(() => {
    if (!editing) {
      getProfile(token).then((res) => {
        setUser(res.data);
      });
    }
  }, [editing]);

  return (
    <>
      <div>
        <div>EMAIL:</div>
        <div>{user.email}</div>
      </div>
      <div>
        <div>USERNAME:</div>
        {editing ? (
          <input
            type="text"
            name="username"
            placeholder={user.username}
            onChange={(e) => inputHandler(e, setBody)}
          />
        ) : (
          <div>{user.username}</div>
        )}
      </div>
      <div>
        <div>NAME:</div>
        {editing ? (
          <input
            type="text"
            name="name"
            placeholder={user.name ? user.name : "Enter your name"}
            onChange={(e) => inputHandler(e, setBody)}
          />
        ) : (
          <div>{user.name}</div>
        )}
      </div>
      <div>
        <div>SURNAME:</div>
        {editing ? (
          <input
            type="text"
            name="surname"
            placeholder={user.surname ? user.surname : "Enter your surname"}
            onChange={(e) => inputHandler(e, setBody)}
          />
        ) : (
          <div>{user.surname}</div>
        )}
      </div>

      {editing ? (
        <Button
          onClick={() => {
            editHandler(body, token);
          }}
        >
          SEND
        </Button>
      ) : (
        <Button
          onClick={() => {
            setEditing(true);
          }}
        >
          EDIT
        </Button>
      )}
    </>
  );
};
