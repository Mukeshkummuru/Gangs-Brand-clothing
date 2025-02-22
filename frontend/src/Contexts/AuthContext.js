import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPromptModal from '../components/LoginPromptModal';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const location = useLocation();

  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const { data } = await axios.get('https://gangs-backend.onrender.com/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(data.user);
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    setShowLoginPrompt(false);
  }, [location.pathname]);

  const toastMessage = (message, type = "info") => {
    toast.dismiss(); // Clear previous toasts to prevent stacking
    toast(message, {
      type,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, showLoginPrompt, setShowLoginPrompt, toastMessage }}>
      {children}
      {!user && showLoginPrompt && <LoginPromptModal />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
