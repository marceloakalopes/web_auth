import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Form() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5500/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key1: username,
        key2: password,
      }),
    });

    if (res.ok) {
      //localStorage.setItem("username", username)
      navigate("/");
    } else if (!res.ok) {
      console.log("Bad");
    }
  };

  return (
    <div>
      <form action="POST">
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          id="username"
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
        />
        <br />

        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Register
        </button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
}
