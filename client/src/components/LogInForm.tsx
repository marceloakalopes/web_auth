import logo from "@/assets/logo.png";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "./ui/switch";

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
    <div className="block w-[460px] max-w-[520px] min-w-96 mx-auto p-6 bg-black items-center">
      <div className="flex justify-center py-6">
        <Link to="/">
          <img src={logo} alt="white square icon" className="w-36 " />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Log in to your account
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-6">
          <Label htmlFor="username" className="block text-white font-medium text-base">
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
          <Label htmlFor="password" className="block text-white font-medium text-base">
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
            <Label className="font-medium text-base" htmlFor="see-password">Show Password</Label>
          </div>
        </div>
        <Button variant="secondary" type="submit" className="w-full h-12 inline-flex px-10 text-base font-medium">
          Log In
        </Button>
      </form>
      <div className="flex p-5 justify-center">
        <p>{message}</p>
      </div>
      <div className="flex flex-col justify-center gap-8 items-center mt-16">
        <p className="font-medium text-base">Don't have an account? </p>
        <Button variant="ghost" className="inline-flex h-12 px-10 text-base font-medium">
          <Link to="/signup" >
            Sign Up
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LogInForm;
