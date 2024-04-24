import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogInForm = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fieldType, setFieldType] = useState("password");

  const toggleFieldType = () => {
    setFieldType(fieldType === "password" ? "text" : "password");
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:5500/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usernameField: username,
        passwordField: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("__Name", data.userData.Name);
          localStorage.setItem("__Username", data.userData.Username);
          navigate("/dashboard");
        } else if (!data.success) {
          setMessage("Invalid username or password. Try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-[460px] max-w-[520px] min-w-96 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
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
            type={fieldType}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <div className="mb-4">
          <input
            type="checkbox"
            onClick={toggleFieldType}
            className="mr-2"
          />
          <label>Show Password</label>
        </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
      <Link to="/" className="block mt-4 text-sm text-blue-500 hover:underline">
        Home
      </Link>
      <Link
        to="/signup"
        className="block mt-4 text-sm text-blue-500 hover:underline"
      >
        Sign Up
      </Link>
      <div className="flex p-5 justify-center">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LogInForm;
