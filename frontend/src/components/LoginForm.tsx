import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  SxProps,
  Theme,
  useTheme,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

interface LoginFormProps {
  type: string;
  sx?: SxProps<Theme>;
}

const LoginForm: React.FC<LoginFormProps> = ({ type, sx }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, ownerLogin } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'owner') {
      await ownerLogin(email, password);
    } else {
      await login(email, password);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: theme.shadows[3],
        ...sx,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        color={theme.palette.primary.main}
        gutterBottom
      >
        {type === 'owner' ? 'Owner Login' : 'User Login'}
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: '400px' }}
      >
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
      <Typography
        variant="body1"
        color={theme.palette.secondary.main}
        sx={{ mt: 2 }}
      >
        {type === 'owner'
          ? 'Are you a new owner wishing to rent out your car?'
          : 'Are you a new user wishing to rent a car?'}
        <Button
          component={RouterLink}
          to="/register"
          color="secondary"
          sx={{ textTransform: 'none', ml: 1 }}
        >
          Register now
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
