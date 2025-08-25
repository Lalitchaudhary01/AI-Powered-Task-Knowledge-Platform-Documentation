import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );
        console.log("Login successful:", response.data);
        alert("Login successful ✅");
      } else {
        // Register logic
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            name,
            email,
            password,
            confirmPassword,
          }
        );
        console.log("Registration successful:", response.data);
        alert("Registration successful ✅");
      }
    } catch (error) {
      console.error(
        "Auth error:",
        error.response ? error.response.data : error.message
      );
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen bg-cover">
      <div className="mt-16 p-8 rounded-2xl bg-black/30 backdrop-blur-md shadow-lg w-96">
        <h1 className="text-center text-xl font-bold text-black leading-relaxed">
          {isLogin ? "Login to your account" : "Register a new account"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          {/* Name only for Register */}
          {!isLogin && (
            <>
              <Label htmlFor="name" className="text-black">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}

          <Label htmlFor="email" className="text-black">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label htmlFor="password" className="text-black">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password only for Register */}
          {!isLogin && (
            <>
              <Label htmlFor="confirmPassword" className="text-black">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          <Button type="submit" className="mt-4">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <div className="text-center mt-4 text-black">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
