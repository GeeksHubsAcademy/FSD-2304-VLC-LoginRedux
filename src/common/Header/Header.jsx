import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const datos = useSelector(userData);

  return (
    <>
      <div className="navbar">
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </div>

        {datos?.credentials?.token ? (
          <>
            <div onClick={()=>{navigate("/profile")}}>Perfil</div>
            <div
              onClick={() => {
                dispatch(logout());
                navigate("/")
              }}
            >
              Logout
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
        )}
      </div>
    </>
  );
};
