import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogInForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await fetch("http://localhost:5500/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key1: username,
        key2: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("userId", data.data.UserId);
          localStorage.setItem("username", data.data.Username);
          navigate("/dashboard");
        } else if (!data.success) {
          console.log("Bad");
        }
      })
      .catch((err) => console.log(err));
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
          Log In
        </button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
};

export default LogInForm;
