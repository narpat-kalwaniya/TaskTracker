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
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";



interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  projects: { id: string; name: string }[];
  users: { email: string; username: string }[];
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, projects, users }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [projectId, setProjectId] = useState("");
const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
  const [assignee, setAssignee] = useState("");

  const handleSubmit = () => {
    const taskData = {
      project_id: projectId,
      task_title: taskTitle,
      task_description: taskDescription,
      due_date: dueDate,
      creator_email: "",
      creator_username: "",
      assignee: assignee || null,
    };
    console.log("Submitted Task:", taskData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="task-modal-title">
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
        <Typography variant="h6" id="task-modal-title" gutterBottom>
          Create Task
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Title"
              variant="outlined"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Description"
              variant="outlined"
              multiline
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink={true}>Project</InputLabel>
              <Select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                label="Project"
                displayEmpty
              >
                <MenuItem value="" disabled>Select a Project</MenuItem>
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label="Due Date"
      value={dueDate}
      onChange={(newValue) => setDueDate(newValue)}
      slotProps={{
        textField: { fullWidth: true, variant: "outlined" },
      }}
    />
  </LocalizationProvider>
</Grid>;

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink={true}>Assignee</InputLabel>
              <Select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                label="Assignee"
                displayEmpty
              >
                <MenuItem value="">None</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.username} value={user.username}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
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

export default TaskModal;
