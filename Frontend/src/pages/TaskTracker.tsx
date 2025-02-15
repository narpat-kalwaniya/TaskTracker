import { Box, Button } from "@mui/material";
import { useState } from "react";
import ReusableTable, { RowData } from "../components/Table";
import CustomModal from "../components/Modal";
import { useFetchTasks } from "../services/hooks/useFetchTasks";
import { TASK_COLUMNS } from "../configs/constants";

const TaskTracker = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<RowData | null>(null);

  const { data: tasks, isLoading } = useFetchTasks();

  const users = [
    { email: "john@example.com", username: "JohnDoe" },
    { email: "jane@example.com", username: "JaneDoe" },
  ];


  const handleCreateTask = () => {
  setSelectedTask(null);
  setOpen(true); 
};

const handleModifyTask = (task: RowData) => {
  setSelectedTask(task);
  setOpen(true);
};

const handleCloseModal = () => {
  setSelectedTask(null);
  setOpen(false)
};

  console.log(open, selectedTask)

  return (
    <Box sx={{ width: "100vw", px: 2, mt: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateTask}
        >
          Create Task
        </Button>
      </Box>
      <ReusableTable
        columns={TASK_COLUMNS}
        rows={tasks?.data?.task_data}
        onUpdate={handleModifyTask}
        onDelete={() => {}}
        isLoading = {isLoading}
      />
      ;
      <CustomModal
        modalType="task"
        open={open}
        onClose={handleCloseModal}
        users={users}
        task = {selectedTask}
        setTask={setSelectedTask}
      />
    </Box>
  );
};

export default TaskTracker;
