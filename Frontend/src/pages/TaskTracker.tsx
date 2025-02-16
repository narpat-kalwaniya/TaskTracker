import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import ReusableTable, { RowData } from "../components/Table";
import CustomModal from "../components/Modal";
import { useFetchTasks } from "../services/hooks/useFetchTasks";
import { TASK_COLUMNS } from "../configs/constants";
import { useFetchUsers } from "../services/hooks/useFetchUsers";
import { getUserDetails } from "../utils/helper";
import Toaster from "../components/Snackbar";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ChartContainer from "../components/TableChartContainer";
import FullscreenViewContainerWrapper from "../components/FullscreenViewContainer";

const TaskTracker = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<RowData | null>(null);
  const [openToaster, setOpenToaster] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = useMemo(() => {
    const userInfo = getUserDetails();
    return userInfo?.data?.data[0];
  }, []);

  const { data: tasks, isLoading } = useFetchTasks();
  const { data: users } = useFetchUsers();

  const handleCreateTask = () => {
    if (user.role !== "viewer") {
      setSelectedTask(null);
      setOpen(true);
    } else {
      setOpenToaster(true);
    }
  };

  const handleModifyTask = (task: RowData) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/projects");
  };

  return (
    <Box sx={{ width: "90vw", mx: "5%", mt: 2 }}>
      <Toaster open={openToaster} setOpen={setOpenToaster} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Title
          project_name={`Project : ${location.state?.row?.project_name}`}
          description={[location.state?.row?.description]}
          buttonTitle="Create Project"
          handleButtonClick={handleCreateTask}
          onBack={handleBack}
        />
      </Box>
      <FullscreenViewContainerWrapper
        title={"Task List"}
        container={(handleFullscreenOpen, children, title) => (
          <ChartContainer
            chartTitle={title}
            handleFullscreenOpen={handleFullscreenOpen}
            data={tasks?.data?.task_data}
            containerHeight="auto"
          >
            {children}
          </ChartContainer>
        )}
      >
        {(fullscreen) => (
          <>
            <ReusableTable
              fullscreen={fullscreen}
              columns={TASK_COLUMNS}
              rows={tasks?.data?.task_data}
              onUpdate={handleModifyTask}
              onDelete={() => {}}
              isLoading={isLoading}
            />
          </>
        )}
      </FullscreenViewContainerWrapper>
      <CustomModal
        modalType="task"
        open={open}
        onClose={handleCloseModal}
        users={users?.data?.data}
        task={selectedTask}
        setTask={setSelectedTask}
      />
    </Box>
  );
};

export default TaskTracker;
