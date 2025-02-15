import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const LoginError = () => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: "40%",
        left: "40%",
      }}
    >
      <Box component="h3">Login error! Please try again.</Box>
      <Box sx={{ justifyContent: "center", pl: 8 }}>
        <Button component={Link} to="/" variant="outlined">
          Login Again
        </Button>
      </Box>
    </Box>
  );
};

export default LoginError;
