import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../../constants/routes";
import Layout from "../Layout";
import { useAppSelector } from "../../hooks/useAppSelector";

const PublicRoute: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return !isAuthenticated ? (
    <Layout.Public>
      <Outlet />
    </Layout.Public>
  ) : (
    <Navigate to={routes.DASHBOARD} />
  );
};

export default PublicRoute;
