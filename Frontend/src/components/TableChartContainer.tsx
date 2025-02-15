import React from "react";
import { Box, IconButton, Paper } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import { downloadFile } from "../utils/helper";

interface Option {
  value: string;
  label: string;
}

interface ContainerProps {
  handleFullscreenOpen: () => void;
  chartTitle: string;
  data?: any[];
  disable?: boolean;
  children?: React.ReactNode;
  dropdownOptions?: Option[];
  selectedOptions?: string[];
  dropdownLabel?: string;
  containerHeight?: string;
  handleDropdown?: (selectedOption: string[]) => void;
  handleFinalizedDownload?: () => void;
  RenderInfoIcon?: React.ReactNode;
  RenderDropdown?: React.ReactNode;
  renderDownloadPPT?: boolean;
  handlePPTDownload?: (filename: string) => void;
  isDownloading?: boolean;
  downloadProgress?: number;
}

const ChartContainer: React.FC<ContainerProps> = ({
  handleFullscreenOpen,
  chartTitle,
  data,
  disable,
  children,
  containerHeight,
  handleFinalizedDownload,
  RenderInfoIcon,
  RenderDropdown,
}) => {
  const handleDownloadData = (data: any) => {
    if (handleFinalizedDownload) {
      handleFinalizedDownload();
    } else {
      downloadFile({ data, fileName: chartTitle });
    }
  };
  return (
    <Paper
      sx={{
        width: "100%",
        height: containerHeight || "50vh",
        borderRadius: "8px",
      }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1.5px solid #E5EDF8",
          padding: 1,
        }}
      >
        <Box
          sx={{
            fontSize: "14px",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>{chartTitle}</Box>
          {RenderInfoIcon && RenderInfoIcon}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {RenderDropdown && RenderDropdown}

          <IconButton
            disabled={disable}
            onClick={() => handleDownloadData(data)}
          >
            <FileDownloadOutlinedIcon />
          </IconButton>

          <IconButton onClick={handleFullscreenOpen}>
            <FullscreenRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      {children}
    </Paper>
  );
};

export default ChartContainer;
