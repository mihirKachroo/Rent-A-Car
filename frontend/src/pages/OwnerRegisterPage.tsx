import React from 'react';
import { Container, Toolbar } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

const OwnerRegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Toolbar />
      <RegisterForm isOwner />
    </Container>
  );
};

export default OwnerRegisterPage;
