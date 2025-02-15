import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import ReusableTable from "../components/Table";
import CustomModal from "../components/Modal";
import { useFetchProjects } from "../services/hooks/useFetchProjects";
import { PROJECT_COLUMNS } from "../configs/constants";
import { getUserDetails } from "../utils/helper";
import Toaster from "../components/Snackbar";

const ProjectTracker = () => {
  const [open, setOpen] = useState(false);
  const [openToaster, setOpenToaster] = useState<boolean>(false);
  const { data: projects, isLoading } = useFetchProjects();

  const user = useMemo(() => {
    const userInfo = getUserDetails();
    return userInfo?.data?.data[0];
  }, []);

  const handleCreateProject = () => {
    if (user.role !== "Viewer") {
      setOpen(true);
    } else {
      setOpenToaster(true);
    }
  };
  return (
    <Box sx={{ width: "100vw", px: 1, mt: 2 }}>
      <Toaster open={openToaster} setOpen={setOpenToaster} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProject}
        >
          Create Project
        </Button>
      </Box>
      <ReusableTable
        columns={PROJECT_COLUMNS}
        rows={projects}
        onUpdate={() => {}}
        onDelete={() => {}}
        isLoading={isLoading}
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
