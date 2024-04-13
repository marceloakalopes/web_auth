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

  return <button onClick={logOut} className='px-4 py-2 text-white bg-red-500 rounded-lg focus:outline-none hover:bg-red-600'>Sign Out</button>;
};

export default LogOutButton;
