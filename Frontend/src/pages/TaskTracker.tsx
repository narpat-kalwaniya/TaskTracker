import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';
import TaskModal from '../components/TaskModal';

const TaskTracker = () => {
  const [open, setOpen] = useState(false);
  // Dummy data
  const projects = [
    { id: "1", name: "Project A" },
    { id: "2", name: "Project B" },
  ];

  const users = [
    { email: "john@example.com", username: "JohnDoe" },
    { email: "jane@example.com", username: "JaneDoe" },
  ];
      const rows = [
    { title: "Create Boiler Plate", description: 'Item 1', due_date: '31-01-2025', status: "pending",owner: "owner",project: "FSD-1" },
    { title: "Create Boiler Plate", description: 'Item 1', due_date: '31-01-2025', status: "completed", project: "FSD-1" },
    { title: "Create Boiler Plate", description: 'Item 1', due_date: '31-01-2025', status: "todo", project: "FSD-1" },
  ];
  return (
    <Box sx={{ width: '100vw', px: 2, mt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Create Task</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow >
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.due_date}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.project}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TaskModal open={open} onClose={() => setOpen(false)} projects={projects} users={users} />

    </Box>
  )
}

export default TaskTracker