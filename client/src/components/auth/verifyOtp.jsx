import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );
      console.log("OTP verification successful:", response.data);
      alert("OTP verification successful ✅");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP");
    }

    // ✅ redirect to login page
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen bg-cover">
      <div className="mt-16 p-8 rounded-2xl bg-black/30 backdrop-blur-md shadow-lg w-96">
        <h1>Verify Otp</h1>
        <Label htmlFor="email" className="text-black">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="otp" className="text-black">
          OTP
        </label>
        <input
          type="text"
          id="otp"
          placeholder="Enter your OTP"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <Button onClick={handleSubmit} className="w-96 mt-4">
        Verify OTP
      </Button>
    </div>
  );
};

export default VerifyOtp;
