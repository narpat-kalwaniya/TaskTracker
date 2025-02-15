import { Box } from "@mui/material";

const AccessDenied: React.FC<{
  headerText: string;
  descriptionText: string;
}> = ({ headerText, descriptionText }) => (
  <Box
    sx={{
      width: "100%",
      textAlign: "center",
      marginTop: "35%",
      marginLeft: "45%",
    }}
  >
    <Box component="h1">{headerText}</Box>
    <p>{descriptionText}</p>
  </Box>
);

export default AccessDenied;
