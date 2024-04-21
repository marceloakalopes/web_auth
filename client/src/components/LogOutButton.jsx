import React from "react";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();

  const logOut = async () => {
    await fetch("http://localhost:5500/api/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem("username");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        logOut();
      }}
      className="px-4 py-2 text-white bg-red-500 rounded-lg focus:outline-none hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default LogOutButton;
