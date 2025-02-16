import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarMessageProps {
  message: string;
  open: boolean;
  onClose: () => void;
  isSuccess: boolean;
}

const Message: React.FC<SnackbarMessageProps> = ({
  message,
  open,
  onClose,
  isSuccess,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert
      onClose={onClose}
      severity={isSuccess ? "success" : "error"}
      sx={{ minWidth: "400px", width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default Message;
