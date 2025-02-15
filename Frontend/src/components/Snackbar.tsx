import { Alert, Snackbar } from "@mui/material";

interface ToasterProps {
  open: boolean;
  setOpen: (open: boolean) => void; // Function to update state
}

const Toaster = ({ open, setOpen }: ToasterProps) => {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return; 
    setOpen(false); 
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="warning"
        variant="filled"
        sx={{ width: "100%" }}
      >
        You don't have permission to perform this action!
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
