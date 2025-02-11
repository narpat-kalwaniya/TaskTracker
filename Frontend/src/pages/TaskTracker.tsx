import { Box, Button, } from '@mui/material';
import { useState } from 'react';
import ReusableTable from '../components/Table';
import CustomModal from '../components/Modal';

const TaskTracker = () => {
  const [open, setOpen] = useState(false);
  const projects = [
    { id: "1", name: "Project A" },
    { id: "2", name: "Project B" },
  ];

  const users = [
    { email: "john@example.com", username: "JohnDoe" },
    { email: "jane@example.com", username: "JaneDoe" },
  ];


  const taskColumns = [
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "due_date", label: "Due Date" },
  { id: "status", label: "Status" },
  { id: "owner", label: "Owner" },
  { id: "project", label: "Project" },
];

const taskRows = [{ title: "Create Boiler Plate", description: 'Item 1', due_date: '31-01-2025', status: "pending",owner: "owner",project: "FSD-1" },
    { title: "Create Boiler Plate", description: 'Item 1', due_date: '31-01-2025', status: "completed", project: "FSD-1" },
    { title: "Create Boiler Plate", description: 'Item 1', due_date: '31-01-2025', status: "todo", project: "FSD-1" }]
  return (
    <Box sx={{ width: '100vw', px: 2, mt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Create Task</Button>
      </Box>
      <ReusableTable columns={taskColumns} rows={taskRows} onUpdate = {() => {}} onDelete={() => {}}/>;
      <CustomModal modalType="task" open={open} onClose={() => setOpen(false)} projects={projects} users={users} />

    </Box>
  )
}

export default TaskTracker