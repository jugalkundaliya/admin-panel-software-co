import React from "react";
import { Box } from "@mui/material";

export const Private: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      bgcolor: "primary.main",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </Box>
);

export const Public: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      background: (theme) =>
        `linear-gradient(186deg, ${theme.palette.primary.main}, ${theme.palette.primary.main}50)`,
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </Box>
);

const Layout: React.FC<{ children: React.ReactNode }> & {
  Private: typeof Private;
  Public: typeof Public;
} = ({ children }) => (
  <Box
    sx={{
      bgcolor: "background.default",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </Box>
);

Layout.Public = Public;
Layout.Private = Private;

export default Layout;
