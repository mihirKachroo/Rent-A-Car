import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
  isOwner?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isOwner }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, ownerLogin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isOwner) {
        await ownerLogin(email, password);
        navigate('/owner');
      } else {
        await login(email, password);
        navigate('/search');
      }
      alert('Login successful!');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isOwner ? 'Owner Login' : 'User Login'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
