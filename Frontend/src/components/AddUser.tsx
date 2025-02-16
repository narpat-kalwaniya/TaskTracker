import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from "@mui/material";
import { ROLE_OPTIONS } from "../configs/constants";
import { useAddNewUser } from "../services/hooks/useManageAccess";
import Loader from "./Loader";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  onMessage: (message: string) => void;
}

const AddUser: React.FC<ModalProps> = ({
  open,
  onClose,
  refetch,
  onMessage,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("New");
  const [emailError, setEmailError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const { mutateAsync } = useAddNewUser();

  // const user = useMemo(() => {
  //   const userInfo = getUserDetails();
  //   return userInfo?.data?.data[0];
  // }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const handleSubmit = async () => {
    setIsLoader(true);
    const data = await mutateAsync({
      user_name: name,
      user_email: email,
      role: role,
    });
    setIsLoader(false);
    onClose();
    refetch();
    onMessage(data?.data?.message);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "70%", md: "50%" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          id="modal-title"
          gutterBottom
          sx={{ color: "black" }}
        >
          Add User
        </Typography>
        <Loader open={isLoader} />

        {!isLoader && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={"User Name"}
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                error={emailError}
                helperText={emailError ? "Enter a valid email address" : ""}
                label={"Email"}
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink={true}>Status</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="Role"
                >
                  {ROLE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button onClick={onClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                disabled={name === "" || (email === "" && role === "role")}
                variant="contained"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default AddUser;
