import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Project {
  id: string;
  customer: string;
  refNumber: string;
  projectName: string;
  projectLocation: string;
  address: string;
}

const mockProjects: Project[] = [
  {
    id: uuidv4(),
    customer: "Olivia Martin",
    refNumber: "89PQRS6789T1U2V3",
    projectName: "Sarah Williams",
    projectLocation: "Telangana",
    address: "Mumbai, Maharastra",
  },
  {
    id: uuidv4(),
    customer: "Michael Jones",
    refNumber: "67KLMN2345P6Q7R8",
    projectName: "Robert Johnson",
    projectLocation: "Uttar Pradesh",
    address: "Bhiwani, Haryana",
  },
];

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    return new Promise<Project[]>((resolve) => {
      setTimeout(() => {
        resolve(mockProjects);
      }, 1000);
    });
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [] as Project[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    addProject: (state, action: PayloadAction<Omit<Project, "id">>) => {
      const newProject = { id: uuidv4(), ...action.payload };
      state.projects.push(newProject);
    },
    editProject: (state, action: PayloadAction<Project>) => {
      const editedProjectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (editedProjectIndex !== -1) {
        state.projects[editedProjectIndex] = { ...action.payload };
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch projects";
      });
  },
});

export const { addProject, deleteProject, editProject } = projectsSlice.actions;
export default projectsSlice.reducer;
