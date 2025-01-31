import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components:{
    MuiButton:{
        styleOverrides: {
        root: {
          boxShadow: 'none', 
          '&:active': {
            boxShadow: 'none', 
          },
        },
    }
    }
  }
});

export default theme;