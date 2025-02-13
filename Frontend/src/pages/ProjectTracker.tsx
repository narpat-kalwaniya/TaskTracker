import { Box, Button } from "@mui/material";
import { useState } from "react";
import ReusableTable from "../components/Table";
import CustomModal from "../components/Modal";
import { useFetchProjects } from "../services/hooks/useFetchProjects";

const ProjectTracker = () => {
  const [open, setOpen] = useState(false);
  const { data: projects, isLoading,  } = useFetchProjects();

  const columns = [
    { id: "project_id", label: "Project ID" },
    { id: "project_name", label: "Project Name" },
    { id: "description", label: "Description" },
    { id: "start_date", label: "Start Date" },
    { id: "end_date", label: "End Date" },
    { id: "project_owner", label: "Owner" },
  ];
  return (
    <Box sx={{ width: "100vw", px: 2, mt: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Create Project
        </Button>
      </Box>
      <ReusableTable
        columns={columns}
        rows={projects}
        onUpdate={() => {}}
        onDelete={() => {}}
        isLoading = {isLoading}
      />
      <CustomModal
        modalType="project"
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default ProjectTracker;
