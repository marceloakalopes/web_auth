import { useState, FormEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "./ui/switch";

const LogInForm = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldType, setFieldType] = useState("password");

  const toggleFieldType = () => {
    setFieldType(fieldType === "password" ? "text" : "password");
  };

  const handleSubmit = async (e: FormEventHandler<HTMLFormElement> | any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5500/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameField: username,
          passwordField: password,
        }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("__Name", data.userData.Name);
        localStorage.setItem("__Username", data.userData.Username);
        navigate("/dashboard");
      } else {
        setMessage("Invalid username or password. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to connect. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <div className="block w-[460px] max-w-[520px] min-w-96 mx-auto p-6 bg-black items-center">
      <div className="flex justify-center py-6">
        <Link to="/">
          <img src={logo} alt="Company Logo" className="w-36" />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Log in to your account
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label
            htmlFor="username"
            className="block text-white font-medium text-base"
          >
            Username:
          </Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-12 text-base font-medium"
          />
        </div>
        <div className="mb-6">
          <Label
            htmlFor="password"
            className="block text-white font-medium text-base"
          >
            Password:
          </Label>
          <Input
            type={fieldType}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 text-base font-medium"
          />
          <div className="flex items-center space-x-2 mt-5">
            <Switch onClick={toggleFieldType} id="see-password" />
            <Label htmlFor="see-password" className="font-medium text-base">
              Show Password
            </Label>
          </div>
        </div>
        <Button
          variant="secondary"
          type="submit"
          className="w-full h-12 inline-flex items-center justify-center px-10 text-base font-medium disabled:pointer-events-none disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.314 1.343 6.315 3.514 8.485l2.486-2.194z"
              ></path>
            </svg>
          ) : (
            "Log In"
          )}
        </Button>
      </form>
      <div className="flex p-5 justify-center">
        <p className="text-white">{message}</p>
      </div>
      <div className="flex flex-col justify-center gap-8 items-center mt-16">
        <p className="font-medium text-base text-white">
          Don't have an account?
        </p>
        <Link to="/signup">
          <Button
            variant="ghost"
            className="inline-flex h-12 px-10 text-base font-medium"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LogInForm;
