import { Box } from "@mui/material";
import ChartContainer from "../../components/TableChartContainer";
import FullscreenViewContainerWrapper from "../../components/FullscreenViewContainer";
import ReusableTable from "../../components/Table";

const data = [
  {
    project_id: 1,
    start_date: "2025-02-12",
    project_owner_email: "sumit.kumar2@tigeranalytics.com",
    project_name: "FSD Project 1",
    end_date: "2025-02-19",
    description: "This is the first project",
    project_owner: "Sumit Kumar",
  },
  {
    project_id: 2,
    start_date: "2025-02-12",
    project_owner_email: "sumit.kumar2@tigeranalytics.com",
    project_name: "Sumit Project",
    end_date: "2025-02-24",
    description: "This is MY project",
    project_owner: "Sumit Kumar",
  },
  {
    project_id: 3,
    start_date: "2025-02-12",
    project_owner_email: "kishan.verma@tigeranalytics.com",
    project_name: "Kishan Project",
    end_date: "2025-02-28",
    description: "This is Kishan's project",
    project_owner: "Kishan Verma",
  },
  {
    project_id: 4,
    start_date: "2025-02-13",
    project_owner_email: "kishan.verma@tigeranalytics.com",
    project_name: "Kishan Project",
    end_date: "2025-02-28",
    description: "This is Kishan's project",
    project_owner: "Kishan Verma",
  },
  {
    project_id: 5,
    start_date: "2025-02-13",
    project_owner_email: "email",
    project_name: "MROI",
    end_date: "2025-02-27",
    description: "marketing mix application for pharma businesses",
    project_owner: "name",
  },
  {
    project_id: 6,
    start_date: "2025-02-13",
    project_owner_email: "email",
    project_name: "Carrier",
    end_date: "2025-02-26",
    description: "Gen AI POC",
    project_owner: "name",
  },
  {
    project_id: 7,
    start_date: "2025-02-13",
    project_owner_email: "email",
    project_name: "Project A",
    end_date: "2025-02-13",
    description: "desc",
    project_owner: "name",
  },
  {
    project_id: 8,
    start_date: "2025-02-13",
    project_owner_email: "email",
    project_name: "FSD 2",
    end_date: "2025-02-13",
    description:
      "Testing the edge case what if the description of the project is very lengthy, so just wanted the text to be lengthy",
    project_owner: "name",
  },
];

const ManageAccess = () => {
  return (
    <Box sx={{ width: "90%", mx: "5%" }}>
      <FullscreenViewContainerWrapper
        title={"Manage Access"}
        container={(handleFullscreenOpen, children, title) => (
          <ChartContainer
            chartTitle={title}
            handleFullscreenOpen={handleFullscreenOpen}
            data={data}
            // containerHeight="auto"
          >
            {children}
          </ChartContainer>
        )}
      >
        {() => (
          <>
            <ReusableTable
              columns={Object.keys(data[0]).map((data) => ({
                id: data,
                label: data,
              }))}
              rows={data}
            />
            {/* <TableComponent
              data={modelBetaResults || []}
              fullscreen={fullScreen}
              columns={
                Array.isArray(modelBetaResults) && modelBetaResults.length > 0
                  ? Object.keys(modelBetaResults[0])?.map((data) => ({
                      id: data,
                      label: data,
                      width: getColumnWidth(data),
                    }))
                  : []
              }
              tableTitle={TITLES_CONFIGS.resultsBetaTableTitle}
              isLoading={isModelBetaResultsLoading}
            /> */}
          </>
        )}
      </FullscreenViewContainerWrapper>
    </Box>
  );
};

export default ManageAccess;
