import React from 'react';
import { Box, Button, Container, Toolbar } from '@mui/material';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const OwnerLoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Toolbar />
      <LoginForm isOwner />
      <Box mt={2} textAlign="center">
        <Button variant="outlined" onClick={() => navigate('/owner-register')}>
          Are you a new owner who want to rent out your car?
        </Button>
      </Box>
    </Container>
  );
};

export default OwnerLoginPage;
