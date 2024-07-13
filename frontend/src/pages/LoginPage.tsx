import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import {
  Container,
  Toolbar,
  Button,
  Box,
  useTheme,
  Typography,
  styled,
  ButtonProps,
} from '@mui/material';

import userBgImage from '../assets/user_bg.jpeg';
import ownerBgImage from '../assets/owner_bg.jpg';

interface ColorButtonProps extends ButtonProps {
  active: boolean;
}

const ColorButton = styled(Button)<ColorButtonProps>(({ theme, active }) => ({
  fontSize: '1.25rem',
  color: active ? theme.palette.secondary.main : theme.palette.text.primary,
  backgroundColor: active ? '#FFFFFF' : '#B0BEC5', // Grey for inactive, white for active
  '&:hover': {
    backgroundColor: '#FFFFFF',
    fontWeight: active ? 'normal' : 'bold', // Bold on hover for inactive
  },
}));

const LoginPage: React.FC = () => {
  const [activeType, setActiveType] = useState<string>('user');

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleButtonClick = (type: string) => {
    setActiveType(type);
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        backgroundImage: `url(${activeType == 'user' ? userBgImage : ownerBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
      }}
    >
      <Box
        component="section"
        sx={{
          width: { sm: '100%', lg: '600px' },
          height: '100%',
          backgroundColor: 'secondary.main',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', gap: 3 }}>
          <ColorButton
            variant="contained"
            size="large"
            active={activeType === 'user'}
            onClick={() => handleButtonClick('user')}
          >
            User
          </ColorButton>
          <ColorButton
            variant="contained"
            size="large"
            active={activeType === 'owner'}
            onClick={() => handleButtonClick('owner')}
          >
            Owner
          </ColorButton>
        </Box>
        <LoginForm type={activeType} sx={{ width: '80%' }} />
        {/* <Box mt={2} textAlign="center">
          <Button variant="outlined" onClick={() => navigate('/owner-login')}>
            Are you an owner renting out your car?
          </Button>
        </Box> */}
      </Box>
    </Container>
  );
};

export default LoginPage;
