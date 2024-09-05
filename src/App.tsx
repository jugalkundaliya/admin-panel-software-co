import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SomethingWentWrong from "./components/SomethingWentWrong";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import routes from "./constants/routes";
import NotFound from "./components/NotFound";
import "./App.css";
import "./i18n";
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Dashboard from "./pages/Dashboard";

// const Dashboard = lazy(() => import("./pages/Dashboard"));
const Estimates = lazy(() => import("./pages/Estimates"));
const Projects = lazy(() => import("./pages/Projects"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

const errorElement = <SomethingWentWrong />;

const router = createBrowserRouter([
  {
    path: routes.HOME,
    errorElement,
    children: [
      {
        element: (
          <ErrorBoundary>
            <PrivateRoute />
          </ErrorBoundary>
        ),
        children: [
          { path: routes.PROJECTS, element: <Projects />, errorElement },
          { path: routes.ESTIMATES, element: <Estimates />, errorElement },
          { path: routes.DASHBOARD, element: <Dashboard />, errorElement },
          {
            path: routes.HOME,
            element: <Navigate to={routes.DASHBOARD} />,
            errorElement,
          },
          { path: routes.NOT_FOUND, element: <NotFound /> },
        ],
      },
      {
        element: (
          <ErrorBoundary>
            <PublicRoute />
          </ErrorBoundary>
        ),
        children: [
          {
            path: routes.LOGIN,
            element: <Login />,
            errorElement,
          },
          {
            path: routes.SIGN_UP,
            element: <SignUp />,
            errorElement,
          },

          { path: routes.NOT_FOUND, element: <NotFound /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
