import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

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
    <div className="w-[460px] max-w-[520px] min-w-96 mx-auto p-6 bg-black">
      <div className="flex justify-center py-6">
        <Link to="/">
          <img src={logo} alt="white square icon" className="w-36 " />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Create an account</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-6">
          <Label htmlFor="name" className="block text-white font-medium text-base">
            Full Name:
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 text-base font-medium"
            required
          />
        </div>
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
            required
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="email" className="block text-white font-medium text-base">
            Email:
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 text-base font-medium"
            required
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
            required
            onCopy={(e) => {
              e.preventDefault();
              return false;
            }}
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }
            }
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="confirmPassword" className="block text-white font-medium text-base">
            Confirm Password:
          </Label>
          <Input
            type={fieldType}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full h-12 text-base font-medium ${password !== confirmPassword ? "border-rose-500" : ""}`}
            required
            onCopy={(e) => {
              e.preventDefault();
              return false;
            }}
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }
            }
          />
        </div>
        <div className="flex items-center space-x-2 mt-5 mb-5">
            <Switch onClick={toggleFieldType} id="see-password" />
            <Label className="font-medium text-base" htmlFor="see-password">Show Password</Label>
          </div>
          <Button variant="secondary" type="submit" className="w-full h-12 inline-flex px-10 text-base font-medium">
          Sign Up
        </Button>
      </form>
      <div className="flex p-5 justify-center">
        <p>{message}</p>
      </div>
      <div className="flex flex-col justify-center gap-8 items-center mt-16">
        <p className="font-medium text-base">Already have an account? </p>
        <Button variant="ghost" className="inline-flex h-12 px-10 text-base font-medium">
          <Link to="/login" >
            Log In
          </Link>
        </Button>
      </div>
    </div>
  );
}
