import { createTheme, ThemeOptions } from '@mui/material/styles';

const theme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      light: '#5BE584',
      main: '#00AB55',
      dark: '#007B55',
    },
    secondary: {
      light: '#FFB74D',
      main: '#BBB',
      dark: '#F57C00',
    }
  },
};

export default createTheme(theme);
