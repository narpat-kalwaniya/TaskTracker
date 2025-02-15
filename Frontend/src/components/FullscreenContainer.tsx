import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";

interface DialogModalProps {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  RenderInfoIcon?: React.ReactNode;
  cValue?: number | string;
  attainment?: number | string;
}
const FullScreenViewContainer: React.FC<DialogModalProps> = ({
  open,
  title,
  RenderInfoIcon,
  children,
  onClose,
  cValue,
  attainment,
}) => (
  <Dialog open={open} fullScreen>
    <DialogTitle fontWeight="bold">
      <Box sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
        {title}
        {RenderInfoIcon && RenderInfoIcon}
      </Box>
      {cValue && attainment && (
        <Box sx={{ display: "flex" }}>
          <Typography fontSize="12px">C Value: {cValue}</Typography>
          <Typography marginX={2} color="#818181" fontSize="12px">
            |
          </Typography>
          <Typography fontSize="12px">Attainment: {attainment}</Typography>
        </Box>
      )}

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          marginBottom: 5,
        }}
      >
        <Cancel sx={{ color: "#BBBBCE69" }} />
      </IconButton>
    </DialogTitle>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default FullScreenViewContainer;
