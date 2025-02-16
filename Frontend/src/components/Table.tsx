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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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
  onDelete?: (id: string) => void;
  isLoading: boolean;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  rows,
  onUpdate,
  isLoading,
}) => {
  const [openToaster, setOpenToaster] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleProjectRowClick = (row: RowData) => {
    if (row.project_id) {
      navigate("/tasks", { state: { project_id: row.project_id } });
    }
  };

  const user = useMemo(() => {
    const userInfo = getUserDetails();
    return userInfo?.data?.data[0];
  }, []);

  const handleEditTask = (row: RowData) => {
    if (user.role !== "Viewer") {
      onUpdate(row);
    } else {
      setOpenToaster(true);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Toaster open={openToaster} setOpen={setOpenToaster} />
      <Table>
        <TableHead>
          <TableRow>
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
                  onClick={() => handleProjectRowClick(row)}
                  sx={{
                    cursor: row?.project_id ? "pointer" : "default",
                    backgroundColor: row?.project_id
                      ? "transparent"
                      : "transparent",
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        color:
                          column.id === "status"
                            ? STATUS_COLORS[row[column.id]] || "inherit"
                            : "inherit",
                      }}
                    >
                      <Box
                        sx={{
                          fontWeight:
                            column.id === "status" ? "bold" : "normal",
                          color: column.id === "access" ? "#0c8618" : "inherit",
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
                    <IconButton
                      onClick={() => handleEditTask(row)}
                      color="default"
                    >
                      <EditIcon />
                    </IconButton>
                    {/* <IconButton onClick={(e) => { e.stopPropagation(); onDelete(row.id); }} color="default">
                  <DeleteIcon />
                </IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;
