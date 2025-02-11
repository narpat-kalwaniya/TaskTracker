import { Box, Button,} from '@mui/material';
import { useState } from 'react';
import ReusableTable from '../components/Table';
import CustomModal from '../components/Modal';

const ProjectTracker = () => {
  const [open, setOpen] = useState(false);
  // Dummy data
  const columns = [
    {id: "project_id", label: "Project ID"},
    {id: "project_name", label: "Project Name"},
    {id: "start_date", label: "Start Date"},
    {id: "end_date", label: "End Date"},
    {id: "owner", label: "Owner"},
  ]
      const rows = [
    { project_id: "Create Boiler Plate", project_name: 'Item 1', start_date: '31-01-2025', end_date: "pending",owner: "owner"},
    { project_id: "Create Boiler Plate", project_name: 'Item 1', start_date: '31-01-2025', end_date: "pending",owner: "owner"},
{ project_id: "Create Boiler Plate", project_name: 'Item 1', start_date: '31-01-2025', end_date: "pending",owner: "owner"},  ];
  return (
    <Box sx={{ width: '100vw', px: 2, mt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Create Project</Button>
      </Box>
<ReusableTable columns={columns} rows={rows} onUpdate = {() => {}} onDelete={() => {}}/>
      <CustomModal modalType='project' open={open} onClose={() => setOpen(false)} />

    </Box>
  )
}

export default ProjectTracker