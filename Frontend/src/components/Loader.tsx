import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface LoaderProps {
  open: boolean;
}

const Loader: React.FC<LoaderProps> = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
