import React from "react";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return <button onClick={logOut}>Sign Out</button>;
};

export default LogOutButton;
