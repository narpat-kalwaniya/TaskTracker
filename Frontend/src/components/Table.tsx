import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Skeleton,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { STATUS_COLORS } from "../configs/constants";
import { getUserDetails } from "../utils/helper";
import Toaster from "./Snackbar";

interface Column {
  id: string;
  label: string;
}

export interface RowData {
  [key: string]: any;
}

interface ReusableTableProps {
  columns: Column[];
  rows: RowData[];
  onUpdate: (updatedRow: RowData) => void;
  onDelete: (updatedRow: RowData) => void;
  isLoading: boolean;
  fullscreen?: boolean;
  isDelete?: boolean;
  isEdit?: boolean;
  tableHeight?: string;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  rows,
  isDelete,
  isEdit,
  onUpdate,
  onDelete,
  isLoading,
  fullscreen,
  tableHeight,
}) => {
  const [openToaster, setOpenToaster] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<RowData>({});

  const navigate = useNavigate();

  const handleProjectRowClick = (row: RowData) => {
    if (row.project_id) {
      navigate("/tasks", { state: { project_id: row.project_id, row: row } });
    }
  };

  const user = useMemo(() => {
    const userInfo = getUserDetails();
    return userInfo?.data?.data[0];
  }, []);

  const handleEditTask = (row: RowData) => {
    if (user.role !== "viewer") {
      onUpdate(row);
    } else {
      setOpenToaster(true);
    }
  };
  const handleOpen = (row: RowData) => {
    setData(row);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleConfirmDelete = () => {
    onDelete(data);
    setOpen(false);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: fullscreen ? "87vh" : tableHeight }}
      >
        <Toaster open={openToaster} setOpen={setOpenToaster} />
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#D9D9ED",
                fontWeight: "bold",
                fontSize: "0.75rem",
                padding: "checkbox",
                zIndex: "1",
              }}
            >
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: "bold" }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold" }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <Skeleton variant="text" width="100%" height={24} />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Skeleton variant="circular" width={24} height={24} />
                      <Skeleton
                        variant="circular"
                        width={24}
                        height={24}
                        sx={{ ml: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : rows?.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{
                      cursor: row?.project_id ? "pointer" : "default",
                      backgroundColor: row?.project_id
                        ? "transparent"
                        : "transparent",
                      fontSize: "0.75rem",
                      padding: "checkbox",
                      borderBottom: "1px dashed #E2E8F0",
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        onClick={
                          column.id === "project_name"
                            ? () => handleProjectRowClick(row)
                            : () => {}
                        }
                        sx={{
                          color:
                            column.id === "status"
                              ? STATUS_COLORS[row[column.id]] || "inherit"
                              : "inherit",
                          "&.MuiTableCell-root": {
                            py: !(isEdit && isDelete) ? 1.5 : 0,
                            maxHeight: "32px",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            fontWeight: ["status", "project_name"].includes(
                              column.id
                            )
                              ? "bold"
                              : "normal",
                            color:
                              column.id === "access"
                                ? "#0c8618"
                                : column.id === "project_name"
                                ? "#0095FF"
                                : "inherit",
                            background:
                              column.id === "access" ? "#66BB6E21" : "inherit",
                            borderRadius:
                              column.id === "access" ? "16px" : "inherit",
                            py: column.id === "access" ? "8px" : "inherit",
                            px: column.id === "access" ? 4 : 0,
                            width: column.id === "access" ? "170px" : "inherit",
                          }}
                        >
                          {row[column.id]}
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell>
                      {isEdit && (
                        <IconButton
                          onClick={() => handleEditTask(row)}
                          color="default"
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {isDelete && (
                        <IconButton
                          onClick={() => {
                            handleOpen(row);
                          }}
                          color="default"
                        >
                          <Delete />
                        </IconButton>
                      )}
                      {/* <IconButton color="default"></IconButton> */}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this item? </DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReusableTable;
