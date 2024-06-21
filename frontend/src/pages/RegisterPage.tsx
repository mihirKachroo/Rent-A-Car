import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Container, Toolbar } from '@mui/material';

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Toolbar />
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
