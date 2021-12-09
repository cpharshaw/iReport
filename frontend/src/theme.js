import { createTheme } from '@mui/material/styles';
// import { createTheme } from '@material-ui/core/styles';

import { red } from '@mui/material/colors';
// import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#0336FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF0266',
      contrastText: '#fff',
    },
    neutral: {
      main: '#A9A9A9',
      light: 'lightgrey',
      dark: 'grey',
      contrastText: '#fff',
    },
    default: {
      main: '#808080',
      light: 'lightgrey',
      dark: 'grey',
      contrastText: '#fff',
    },    
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.6)',
      neutral: 'rgba(0,0,0,0.25)',
      disabled: 'rgba(0,0,0,0.38)',
    }
  },
});

export default theme;