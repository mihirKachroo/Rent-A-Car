import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { Container, Toolbar, Button, Box } from '@mui/material';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Toolbar />
      <LoginForm />
      <Box mt={2} textAlign="center">
        <Button variant="outlined" onClick={() => navigate('/owner-login')}>
          Are you an owner renting out your car?
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
