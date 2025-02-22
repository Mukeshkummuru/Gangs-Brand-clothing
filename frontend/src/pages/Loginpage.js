import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PagesCSS/Auth.css';
import { useAuth } from "../Contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser, setShowLoginPrompt, toastMessage } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toastMessage("⚠️ Please enter both email and password!", "warning");
    }

    try {
      toastMessage("⏳ Logging in, please wait...", "info");

      const { data } = await axios.post('https://gangs-backend.onrender.com/api/auth/login', { email, password });

      localStorage.setItem("token", data.token);
      setUser({ token: data.token });
      setShowLoginPrompt(false);

      toastMessage("🔥 Welcome back to GANGS! Get ready to shop in style!", "success");
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Server error';
      toastMessage(`🚨 Oops! ${errorMessage}`, "error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glassmorphism">
        <h2>Welcome Back!</h2>
        <p>Sign in to continue</p>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="auth-button">Sign In</button>
        </form>
        <div className="auth-links">
          <Link to="/register">Don't have an account? <span>Create Account</span></Link>
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
