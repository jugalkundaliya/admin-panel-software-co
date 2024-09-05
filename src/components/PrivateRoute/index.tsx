import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Divider,
  styled,
} from "@mui/material";
import {
  Speed as SpeedIcon,
  Apps as AppsIcon,
  LocalAtm as LocalAtmIcon,
  Pix as PixIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import routes from "../../constants/routes";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout, persistAuth } from "../../store/slices/authSlice";

const NavItem = styled(ListItem)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    cursor: "pointer",
    "& .MuiListItemIcon-root": {
      color: theme.palette.text.secondary,
    },
    "> div": {
      display: "flex",
      alignItems: "center",
      ...(selected && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        width: "calc(100% - 20px)",
        borderRadius: theme.shape.borderRadius,
        "& .MuiListItemIcon-root": {
          color: theme.palette.primary.contrastText,
        },
        height: "100%",
      }),
    },
    ...(selected && {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      padding: "0 12px",
      height: "40px",
    }),
  })
);

const drawerWidth = 240;
const PrivateRoute: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user) || null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const persistedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (persistedUser) {
      dispatch(persistAuth({ user: persistedUser }));
    }
  }, [dispatch]);

  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate(routes.LOGIN);
  };

  if (!isAuthenticated && user === null) {
    return <Navigate to={routes.LOGIN} />;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: (theme) => theme.palette.background.default,
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: (theme) => theme.palette.white.main,
          }}
        >
          <PixIcon />
        </Toolbar>
        <Divider />
        <List>
          <NavItem
            selected={pathname === routes.DASHBOARD}
            onClick={() => navigate(routes.DASHBOARD)}
          >
            <Box>
              <ListItemIcon>
                <SpeedIcon />
              </ListItemIcon>
              Dashboard
            </Box>
          </NavItem>
          <NavItem
            selected={pathname === routes.PROJECTS}
            onClick={() => navigate(routes.PROJECTS)}
          >
            <Box>
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              Projects
            </Box>
          </NavItem>
          <NavItem
            selected={pathname === routes.ESTIMATES}
            onClick={() => navigate(routes.ESTIMATES)}
          >
            <Box>
              <ListItemIcon>
                <LocalAtmIcon />
              </ListItemIcon>
              Estimates
            </Box>
          </NavItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <AppBar
          position="sticky"
          elevation={1}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: "100%" }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              bgcolor: (theme) => theme.palette.white.main,
            }}
          >
            <InputBase
              placeholder="Search…"
              sx={{
                bgcolor: "background.default",
                padding: (theme) => theme.spacing(0.5, 2),
                borderRadius: 1,
                width: 400,
              }}
            />
            <Box>
              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            background: (theme) => theme.palette.white.main,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PrivateRoute;
