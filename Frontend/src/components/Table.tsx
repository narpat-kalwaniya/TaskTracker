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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id: string;
  label: string;
}

interface RowData {
  [key: string]: any;
}

interface ReusableTableProps {
  columns: Column[];
  rows: RowData[];
  onUpdate: (updatedRow: RowData) => void;
  onDelete: (id: string) => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({ columns, rows, onUpdate, onDelete }) => {


  const handleEditClick = (row: RowData) => {
console.log(row)
  };



  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} sx={{ fontWeight: "bold" }}>
                {column.label}
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: "bold" }}/>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => handleEditClick(row)} color="default">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(row.id)} color="default">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;