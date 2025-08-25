import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Auth = () => {
  return (
    <div>
      <h1> Welcome to AI-powered Task & Knowledge Platform Documentation</h1>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="Enter your email" />
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter your email" />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        <button>submit</button>
      </div>
    </div>
  );
};

export default Auth;
