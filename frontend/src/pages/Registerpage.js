import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PagesCSS/Auth.css";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toastMessage } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toastMessage("⚠️ Please fill in all fields.", "warning");
    }

    if (password.length < 6) {
      return toastMessage("🔑 Password must be at least 6 characters long!", "warning");
    }

    if (password !== confirmPassword) {
      return toastMessage("⚠️ Passwords do not match! Try again.", "warning");
    }

    try {
      toastMessage("⏳ Registering your account, please wait...", "info");

      const { data } = await axios.post("https://gangs-backend.onrender.com/api/auth/register", {
        name,
        email,
        password
      });

      localStorage.setItem("token", data.token);

      toastMessage("🎉 Welcome to GANGS! Your journey starts now. 🚀", "success");
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Server error";
      toastMessage(`💥 Whoops! ${errorMessage}`, "error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join us today!</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Register</button>
        </form>
        <div className="auth-links">
          <Link to="/login">Already have an account? <span>Sign In</span></Link>
          <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
