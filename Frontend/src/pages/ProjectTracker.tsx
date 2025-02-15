import { Box, Button } from "@mui/material";
import { useState } from "react";
import ReusableTable from "../components/Table";
import CustomModal from "../components/Modal";
import { useFetchProjects } from "../services/hooks/useFetchProjects";
import { PROJECT_COLUMNS } from "../configs/constants";

const ProjectTracker = () => {
  const [open, setOpen] = useState(false);
  const { data: projects, isLoading,  } = useFetchProjects();
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
        columns={PROJECT_COLUMNS}
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
