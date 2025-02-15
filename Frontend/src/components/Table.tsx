import React from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { STATUS_COLORS } from "../configs/constants";

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
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const ReusableTable: React.FC<ReusableTableProps> = ({ columns, rows, onUpdate, onDelete, isLoading }) => {

  const navigate = useNavigate();

const handleProjectRowClick = (row: RowData) => {
  if (row.project_id) {
    navigate("/tasks", { state: { project_id: row.project_id } });
  }
};

const handleEditTask = (row: RowData) => {
  onUpdate(row)
}


  return (
    <TableContainer component={Paper}>
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
            ? 
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton variant="text" width="100%" height={24} />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="circular" width={24} height={24} sx={{ ml: 1 }} />
                  </TableCell>
                </TableRow>
              )) : 
          rows?.map((row) => (
            <TableRow hover
              key={row.id}
              onClick={() => handleProjectRowClick(row)}
              sx={{
                cursor: row.project_id ? "pointer" : "default", 
                backgroundColor: row.project_id ? "transparent" : "#f5f5f5", 
              }}
            >
              {columns.map((column) => (
                <TableCell key={column.id} sx={{
                    color: column.id === "status" ? STATUS_COLORS[row[column.id]] || "inherit" : "inherit",
                    fontWeight: column.id === "status" ? "bold" : "normal",
                  }}>{row[column.id]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => handleEditTask(row)} color="default">
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