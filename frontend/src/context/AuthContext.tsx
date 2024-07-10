import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import authService from '../services/authService';
import axios from 'axios';

// Define the shape of our context state
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, dob: string) => Promise<void>;
  ownerLogin: (email: string, password: string) => Promise<void>;
  ownerRegister: (
    email: string,
    password: string,
    dob: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log('attempting login with ', email);
    try {
      const user = await authService.login(email, password);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        alert('Login failed. Please check your credentials.');
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred.');
      }
    }
  };

  const ownerLogin = async (email: string, password: string) => {
    try {
      const owner = await authService.ownerLogin(email, password);
      setUser(owner);
      localStorage.setItem('user', JSON.stringify(owner));
      navigate('/owner-dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        alert('Owner Login failed. Please check your credentials.');
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred.');
      }
    }
  };

  const register = async (email: string, password: string, dob: string) => {
    try {
      const user = await authService.register(email, password, dob);
      console.log(user);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      alert('Registration successful!');
      navigate('/search');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const ownerRegister = async (
    email: string,
    password: string,
    dob: string
  ) => {
    try {
      const owner = await authService.ownerRegister(email, password, dob);
      setUser(owner);
      localStorage.setItem('user', JSON.stringify(owner));
      alert('Owner registration successful!');
      navigate('/owner-dashboard');
    } catch (error) {
      alert('Owner registration failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, ownerLogin, ownerRegister, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
