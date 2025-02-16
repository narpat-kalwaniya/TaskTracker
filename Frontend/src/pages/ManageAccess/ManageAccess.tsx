import { Box } from "@mui/material";
import ChartContainer from "../../components/TableChartContainer";
import FullscreenViewContainerWrapper from "../../components/FullscreenViewContainer";
import { useFetchUsers } from "../../services/hooks/useFetchUsers";
import ReusableTable from "../../components/Table";
import Title from "../../components/Title";
import { USERS_COLUMN } from "../../configs/constants";
import { useState } from "react";
import AddUser from "../../components/AddUser";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

const ManageAccess = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMessage, setIsMessage] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  const handleMessage = (message: string) => {
    setSnackbarMessage(message);
    setIsMessage(true);
  };
  const handleMessageClose = () => {
    setIsMessage(false);
  };

  const { data: users, isFetching, isLoading, refetch } = useFetchUsers();

  const handleAddUserOpen = () => {
    setIsOpen(true);
  };
  const handleAddUserClose = () => {
    setIsOpen(false);
  };

  const onBack = () => {
    navigate("/projects");
  };
  return (
    <Box sx={{ width: "90%", mx: "5%" }}>
      <Box sx={{ position: "absolute", top: "20%", left: "40%" }}>
        <Message
          open={isMessage}
          isSuccess={snackbarMessage !== "User already Exists"}
          message={snackbarMessage}
          onClose={handleMessageClose}
        />
      </Box>
      <Title
        project_name="Manage Access"
        description={[
          "Manage user access, roles, and permissions to ensure security and compliance",
        ]}
        buttonTitle="Add User"
        handleButtonClick={handleAddUserOpen}
        onBack={onBack}
      />
      <FullscreenViewContainerWrapper
        title={"User List"}
        container={(handleFullscreenOpen, children, title) => (
          <ChartContainer
            chartTitle={title}
            handleFullscreenOpen={handleFullscreenOpen}
            data={users?.data?.data}
            containerHeight="auto"
          >
            {children}
          </ChartContainer>
        )}
      >
        {() => (
          <>
            <ReusableTable
              onUpdate={() => {}}
              columns={USERS_COLUMN}
              rows={
                users?.data?.data.map((item) => ({
                  ...item,
                  access: "Access Granted",
                })) || []
              }
              isLoading={isLoading || isFetching}
            />
          </>
        )}
      </FullscreenViewContainerWrapper>
      <AddUser
        open={isOpen}
        onClose={handleAddUserClose}
        refetch={refetch}
        onMessage={handleMessage}
      />
    </Box>
  );
};

export default ManageAccess;
