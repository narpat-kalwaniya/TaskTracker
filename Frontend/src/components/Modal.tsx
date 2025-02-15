import React, { useState, useEffect } from "react";
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
  Tooltip,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useCreateTask } from "../services/hooks/useCreateTask";
import { useCreateProject } from "../services/hooks/useCreateProject";
import { useLocation } from "react-router-dom";
import { RowData } from "./Table";
import { STATUS_COLORS, TASK_STATUS_OPTIONS } from "../configs/constants";
import { useUpdateTask } from "../services/hooks/useUpdateTask";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  modalType: "task" | "project";
  users?: { user_email: string; user_name: string; role: string }[];
  task?: RowData | null;
  setTask?: any;
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  modalType,
  users = [],
  task,
  setTask,
}) => {
  const isTaskModal = modalType === "task";
  const location = useLocation();
  const project_id = location.state?.project_id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("New");

  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: createProject } = useCreateProject();

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setDueDate(null);
      setAssignee("");
      setStatus("New");
    }
    if (open) {
      if (task) {
        setTitle(task.task_title);
        setDescription(task.task_description);
        setDueDate(task.due_date ? dayjs(task.due_date) : null);
        setAssignee(task.assignee_email || "");
        setStatus(task.status || "New");
      } else {
        setTitle("");
        setDescription("");
        setDueDate(null);
        setAssignee("");
        setStatus("New");
      }
    }
  }, [open, task]);

  const isEditing = !!task;

  const handleSubmit = () => {
    const data = isTaskModal
      ? {
          task_id: task?.task_id,
          project_id: project_id || "",
          task_title: title,
          task_description: description,
          due_date: dueDate || null,
          assignee_email: assignee,
          status: status,
          task_owner_email: "email",
          task_owner: "name",
        }
      : {
          project_title: title ?? "",
          project_description: description,
          project_end_date: dueDate || null,
          creator_email: "email",
          creator_username: "name",
        };
    const createTaskPayload = {
      task_title: title,
      task_description: description,
      project_id: project_id,
      due_date: dueDate,
      assignee_email: assignee,
      task_owner_email: "email",
      task_owner: "name",
    };

    if (isTaskModal) {
      if (isEditing) {
        if (data.task_title) updateTask(data);
      } else {
        createTask(createTaskPayload);
      }
    } else {
      if (data.project_title) createProject(data);
    }
    setTitle("");
    setDescription("");
    setDueDate(null);
    setAssignee("");
    setStatus("New");
    setTask(null);
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
        <Typography
          variant="h6"
          id="modal-title"
          gutterBottom
          sx={{ color: "black" }}
        >
          {isEditing
            ? "Update Task"
            : isTaskModal
            ? "Create Task"
            : "Create Project"}
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

          <Grid item xs={12} sm={12}>
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

                  {users?.map((user) => (
                    <MenuItem key={user.user_email} value={user.user_email}>
                      <Tooltip
                        title={
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span>Role: {user.role}</span>
                            <span>Email: {user.user_email}</span>
                          </div>
                        }
                        placement="right"
                      >
                        <span>{user.user_name}</span>
                      </Tooltip>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {task && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink={true}>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  {TASK_STATUS_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ color: STATUS_COLORS[option.value] }}
                    >
                      {option.label}
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
              {isEditing ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CustomModal;
