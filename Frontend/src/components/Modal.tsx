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

interface ModalProps {
  open: boolean;
  onClose: () => void;
  modalType: "task" | "project";
  projects?: { id: string; name: string }[];
  users?: { email: string; username: string }[];
}

const CustomModal: React.FC<ModalProps> = ({ open, onClose, modalType, projects = [], users = [] }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
  const [assignee, setAssignee] = useState("");

  const isTaskModal = modalType === "task";

  const handleSubmit = () => {
    const data = isTaskModal
      ? {
          project_id: projectId,
          task_title: title,
          task_description: description,
          due_date: dueDate,
          assignee: assignee || null,
        }
      : {
          project_title: title,
          project_description: description,
          end_date: dueDate,
        };

    console.log(`Submitted ${modalType}:`, data);
    onClose();
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
        <Typography variant="h6" id="modal-title" gutterBottom>
          {isTaskModal ? "Create Task" : "Create Project"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={isTaskModal ? "Task Title" : "Project Title"}
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={isTaskModal ? "Task Description" : "Project Description"}
              variant="outlined"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>

          {isTaskModal && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink={true}>Project</InputLabel>
                <Select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  label="Project"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select a Project
                  </MenuItem>
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={isTaskModal ? 6 : 12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={isTaskModal ? "Due Date" : "Project End Date"}
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                slotProps={{
                  textField: { fullWidth: true, variant: "outlined" },
                }}
              />
            </LocalizationProvider>
          </Grid>

          {isTaskModal && (
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
          )}

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

export default CustomModal;
