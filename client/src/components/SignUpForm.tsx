import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUpForm() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fieldType, setFieldType] = useState("password");

  const toggleFieldType = () => {
    setFieldType(fieldType === "password" ? "text" : "password");
  };

  const handleSubmit = async () => {

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }
    await fetch("http://localhost:5500/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameField: name,
        usernameField: username,
        emailField: email,
        passwordField: password,
        confirmPasswordField: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/success");
        } else if (!data.success) {
          setMessage(data.message);
        }
      });
  };

  return (
    <div className="w-[460px] max-w-[520px] min-w-96 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Full Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
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
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
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
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password:
          </label>
          <input
            type={fieldType}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            onClick={toggleFieldType}
            className="mr-2"
          />
          <label>Show Password</label>
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
      <div className="flex p-5 justify-center">
        <p>{message}</p>
      </div>
    </div>
  );
}
