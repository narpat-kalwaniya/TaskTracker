import { Box, Button } from "@mui/material";
import { useState } from "react";
import ReusableTable from "../components/Table";
import CustomModal from "../components/Modal";
import { useFetchTasks } from "../services/hooks/useFetchTasks";

const TaskTracker = () => {
  const [open, setOpen] = useState(false);

  const { data: tasks, isLoading } = useFetchTasks();

  const projects = [
    { id: "1", name: "Project A" },
    { id: "2", name: "Project B" },
  ];

  const users = [
    { email: "john@example.com", username: "JohnDoe" },
    { email: "jane@example.com", username: "JaneDoe" },
  ];

  const taskColumns = [
    { id: "task_title", label: "Title" },
    { id: "task_description", label: "Description" },
    { id: "due_date", label: "Due Date" },
    { id: "task_owner", label: "Owner" },
    { id: "assignee_email", label: "Assignee" },
    { id: "status", label: "Status" },
  ];

  return (
    <Box sx={{ width: "100vw", px: 2, mt: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Create Task
        </Button>
      </Box>
      <ReusableTable
        columns={taskColumns}
        rows={tasks?.data?.task_data}
        onUpdate={() => {}}
        onDelete={() => {}}
        isLoading = {isLoading}
      />
      ;
      <CustomModal
        modalType="task"
        open={open}
        onClose={() => setOpen(false)}
        projects={projects}
        users={users}
      />
    </Box>
  );
};

export default TaskTracker;
