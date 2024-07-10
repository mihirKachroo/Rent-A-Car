import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface RegisterFormProps {
  isOwner?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isOwner }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const { register, ownerRegister } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isOwner) {
      await ownerRegister(email, password, dob);
      navigate('/owner');
    } else {
      await register(email, password, dob);
      navigate('/search');
    }
    alert('Registration successful!');
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isOwner ? 'Owner Registration' : 'User Registration'}
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
        <TextField
          label="Date of Birth"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
