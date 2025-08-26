import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/auth";
import VerifyOtp from "./components/auth/verifyOtp";
import Home from "./components/Pages/Home";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
