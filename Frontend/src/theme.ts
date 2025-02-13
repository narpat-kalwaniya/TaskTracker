import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Articulat CF, Roboto, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#0095FF",
    },
    secondary: {
      main: "#F59C34",
    },
    text: {
      primary: "#333333",
      secondary: "#1A1A1A",
    },
    background: {
      paper: "#fff",
      default: "#F7F8FA",
    },
  },
  components: {
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiInputBase-root": {
    //         height: "26px",
    //         padding: "0 8px",
    //       },
    //       "& .MuiInputBase-input": {
    //         height: "26px",
    //         padding: "0",
    //         boxSizing: "border-box",
    //       },
    //       "& .MuiInputLabel-root": {
    //         fontSize: "12px",
    //       },
    //       "& input": {
    //         fontSize: "12px",
    //       },
    //       "& .MuiInputAdornment-root": {
    //         padding: "2px",
    //       },
    //     },
    //   },
    // },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "white",
          color: "rgba(0, 0, 0, 0.87)",
          fontSize: 11,
          maxWidth: 500,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
        arrow: {
          color: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
