import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Profile = () => {
  const [user, setUser] = useState({});

  const datos = useSelector(userData)
  const token = datos?.credentials?.token

  useEffect(() => {
    getProfile(token)
    .then(res => {
        setUser(res.data)
    })
  }, []);

  return <>
  <div>{user.username}</div>
  <div>{user.email}</div>
  <div>{user.createdAt}</div>
  </>;
};
