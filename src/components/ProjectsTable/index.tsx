import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  addProject,
  deleteProject,
  editProject,
  fetchProjects,
} from "../../store/slices/projectSlice";

interface Project {
  id: string;
  customer: string;
  refNumber: string;
  projectName: string;
  projectLocation: string;
  address: string;
}

const ProjectTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const loading = useAppSelector((state) => state.projects.loading);
  const [filter, setFilter] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    customer: "",
    refNumber: "",
    projectName: "",
    projectLocation: "",
    address: "",
  });

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.customer.toLowerCase().includes(filter.toLowerCase()) ||
      project.projectName.toLowerCase().includes(filter.toLowerCase()) ||
      project.projectLocation.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddProject = () => {
    if (editingProjectId) {
      dispatch(editProject({ id: editingProjectId, ...newProject }));
    } else {
      const newProjectData: Project = {
        id: uuidv4(),
        ...newProject,
      };
      dispatch(addProject(newProjectData));
    }
    setIsModalOpen(false);
    setNewProject({
      customer: "",
      refNumber: "",
      projectName: "",
      projectLocation: "",
      address: "",
    });
  };

  const handleDeleteProject = (id: string) => {
    dispatch(deleteProject(id));
  };

  const handleEditProject = (id: string) => {
    handleMenuClose();
    setEditingProjectId(id);
    setNewProject(projects.find((project) => project.id === id)!);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box p={2}>
      <Toolbar sx={{ p: "0 !important" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 500 }}
        >
          Projects
        </Typography>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            marginRight: 4,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Projects"
            value={filter}
            onChange={handleFilterChange}
          />
          <IconButton sx={{ p: "10px" }} aria-label="filter">
            <FilterListIcon />
          </IconButton>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openModal}
        >
          Add Project
        </Button>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Ref Number</TableCell>
              <TableCell colSpan={2} align="center">
                Project Reference
              </TableCell>
              <TableCell>Project Location</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell /> <TableCell>Project Name</TableCell>
              <TableCell>Project Number</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.customer}</TableCell>
                <TableCell>{project.refNumber}</TableCell>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>{project.projectLocation}</TableCell>
                <TableCell>{project.address}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleDeleteProject(project.id)}>
                      Delete
                    </MenuItem>
                    <MenuItem onClick={() => handleEditProject(project.id)}>
                      Edit
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredProjects.length}
        page={page}
        onPageChange={(_, page) => setPage(page)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(e.target.value as unknown as number);
        }}
      />

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Customer"
            fullWidth
            value={newProject.customer}
            onChange={(e) =>
              setNewProject({ ...newProject, customer: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Ref Number"
            fullWidth
            value={newProject.refNumber}
            onChange={(e) =>
              setNewProject({ ...newProject, refNumber: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Project Name"
            fullWidth
            value={newProject.projectName}
            onChange={(e) =>
              setNewProject({ ...newProject, projectName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Project Location"
            fullWidth
            value={newProject.projectLocation}
            onChange={(e) =>
              setNewProject({ ...newProject, projectLocation: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={newProject.address}
            onChange={(e) =>
              setNewProject({ ...newProject, address: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProject} color="primary">
            {editingProjectId ? "Edit" : "Add"} Project
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectTable;
