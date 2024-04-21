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
        usernameField: username,
        passwordField: password,
      }),
    });

    if (res.ok) {
      //localStorage.setItem("username", username)
      navigate("/success");
    } else if (!res.ok) {
      console.log("Bad");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <Link to="/" className="block mt-4 text-sm text-blue-500 hover:underline">
        Home
      </Link>
      <Link
        to="/login"
        className="block mt-4 text-sm text-blue-500 hover:underline"
      >
        Login
      </Link>
    </div>
  );
}
