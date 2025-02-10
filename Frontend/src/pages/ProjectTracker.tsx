import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';
import ProjectModal from '../components/ProjectModal';

const ProjectTracker = () => {
  const [open, setOpen] = useState(false);
  // Dummy data
      const rows = [
    { project_id: "Create Boiler Plate", project_name: 'Item 1', start_date: '31-01-2025', end_date: "pending",owner: "owner"},
    { project_id: "Create Boiler Plate", project_name: 'Item 1', start_date: '31-01-2025', end_date: "pending",owner: "owner"},
{ project_id: "Create Boiler Plate", project_name: 'Item 1', start_date: '31-01-2025', end_date: "pending",owner: "owner"},  ];
  return (
    <Box sx={{ width: '100vw', px: 2, mt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Create Project</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Project Start Date</TableCell>
              <TableCell>Project End Date</TableCell>
              <TableCell>Project Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow >
                <TableCell>{row.project_id}</TableCell>
                <TableCell>{row.project_name}</TableCell>
                <TableCell>{row.start_date}</TableCell>
                <TableCell>{row.end_date}</TableCell>
                <TableCell>{row.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProjectModal open={open} onClose={() => setOpen(false)} />

    </Box>
  )
}

export default ProjectTracker