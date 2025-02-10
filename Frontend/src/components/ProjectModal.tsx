import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";



interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose,}) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);


  const handleSubmit = () => {
    const projectData = {
      project_title: projectTitle,
      project_description: projectDescription,
      start_date: dueDate,
      end_date: "",
      creator_username: "",
    };
    console.log("Submitted Project:", projectData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="project-modal-title">
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
        <Typography variant="h6" id="project-modal-title" gutterBottom>
          Create Project
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Title"
              variant="outlined"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Description"
              variant="outlined"
              multiline
              rows={3}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} >
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label="Project End Date"
      value={dueDate}
      onChange={(newValue) => setDueDate(newValue)}
      slotProps={{
        textField: { fullWidth: true, variant: "outlined" },
      }}
    />
  </LocalizationProvider>
</Grid>;


          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProjectModal;
