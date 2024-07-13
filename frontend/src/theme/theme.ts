import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A62E7',
    },
    secondary: {
      main: '#232E42',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    heading1: {
      fontSize: '2.25rem',
    },
    heading2: {
      fontSize: '1.5rem',
    },
  },
});

export default theme;
