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
import { useCreateTask } from "../services/hooks/useCreateTask";
import { useCreateProject } from "../services/hooks/useCreateProject";
import { useLocation } from "react-router-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  modalType: "task" | "project";
  users?: { email: string; username: string }[];
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  modalType,
  users = [],
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
  const [assignee, setAssignee] = useState("");
  const { mutate: createTask } = useCreateTask();
  const { mutate: createProject } = useCreateProject();

  const isTaskModal = modalType === "task";
  const location = useLocation();
  const project_id = location.state?.project_id; 

  const handleSubmit = () => {
    const data = isTaskModal
      ? {
          project_id: project_id,
          task_title: title,
          task_description: description,
          due_date: dueDate ?? "",
          assignee_email: assignee || null,
          task_owner_email: "email",
          task_owner: "name"
        }
      : {
          project_title: title ?? "",
          project_description: description,
          project_end_date: dueDate ?? "",
          creator_email: "email",
          creator_username: "name"
        };

    if (isTaskModal) {
      createTask(data);
    } else {
      createProject(data);
    }
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
          <Grid item xs={12} sm={ 12}>
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
