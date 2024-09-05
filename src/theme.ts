import { createTheme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    black: Palette["primary"];
    white: Palette["primary"];
  }
  interface PaletteOptions {
    black?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
  }
}

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#1877F2",
    },
    secondary: {
      main: "#757575",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ffa726",
    },
    success: {
      main: "#4caf50",
    },
    info: {
      main: "#9c27b0",
    },
    black: {
      main: "#000000",
    },
    white: {
      main: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
