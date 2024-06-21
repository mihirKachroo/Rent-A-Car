import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../types';

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

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const user: User = response.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/search');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const ownerLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/owner-login',
        { email, password }
      );
      const owner: User = response.data;
      setUser(owner);
      localStorage.setItem('user', JSON.stringify(owner));
      navigate('/owner-dashboard');
    } catch (error) {
      alert('Owner login failed. Please check your credentials.');
    }
  };

  const register = async (email: string, password: string, dob: string) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        dob,
      });
      const user: User = response.data;
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
      const response = await axios.post(
        'http://localhost:3000/auth/owner-register',
        {
          email,
          password,
          dob,
        }
      );
      const owner: User = response.data;
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
