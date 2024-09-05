import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IEstimateRecord } from "../EstimatesForm/EstimateRecord";

export interface Estimate {
  version: string;
  project: string;
  client: string;
  createdAt: string;
  lastModified: string;
  status: string;
  action: () => void;
  estimates: IEstimateRecord[];
}

const getStatusChipColor = (status: string) => {
  switch (status) {
    case "Created":
      return "success";
    case "Processing":
      return "info";
    case "Rejected":
      return "error";
    case "On Hold":
      return "warning";
    case "In Transit":
      return "primary";
    default:
      return "default";
  }
};

type EstimatesTableProps = {
  estimates: Estimate[];
  onEdit: (index: number) => void;
};

const EstimatesTable: React.FC<EstimatesTableProps> = ({
  estimates,
  onEdit,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const handleEdit = (index: number) => {
    onEdit(index);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ textTransform: "uppercase" }}>
          <TableRow>
            <TableCell>Version</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Last Modified</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {estimates.map((estimate, index) => (
            <TableRow key={estimate.version}>
              <TableCell>{estimate.version}</TableCell>
              <TableCell>{estimate.project}</TableCell>
              <TableCell>{estimate.client}</TableCell>
              <TableCell>{estimate.createdAt}</TableCell>
              <TableCell>{estimate.lastModified}</TableCell>
              <TableCell>
                <Chip
                  label={estimate.status}
                  color={getStatusChipColor(estimate.status)}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(index)} aria-label="edit">
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={estimates.length}
        page={page}
        onPageChange={(_, page) => setPage(page)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(e.target.value as unknown as number);
        }}
      />
    </TableContainer>
  );
};

export default EstimatesTable;
