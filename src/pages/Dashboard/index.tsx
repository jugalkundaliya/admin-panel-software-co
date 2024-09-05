import React from "react";
import { Box, Card, Typography } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Group as GroupIcon,
  ViewInAr as ViewInArIcon,
  Restore as RestoreIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";
import InfoCard from "../../components/InfoCard";
import SalesLineChart from "../../components/SalesChart";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, fontWeight: 500 }}
      >
        Dashboard
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
        <InfoCard
          label="Total Users"
          value="40,689"
          iconColor={"#9c27b0"}
          icon={<GroupIcon />}
          footer={
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: (theme) => theme.palette.success.main,
                }}
              >
                <TrendingUpIcon /> 8.5%
              </Box>{" "}
              Up from the yesterday
            </Typography>
          }
        />
        <InfoCard
          label="Total Orders"
          value="10623"
          iconColor={"#ffa726"}
          icon={<ViewInArIcon />}
          footer={
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: (theme) => theme.palette.success.main,
                }}
              >
                <TrendingUpIcon /> 1.3%
              </Box>{" "}
              Up from past week
            </Typography>
          }
        />
        <InfoCard
          label="Total Sales"
          value="$89,000"
          iconColor={"#f44336"}
          icon={<TimelineIcon />}
          footer={
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: (theme) => theme.palette.error.main,
                }}
              >
                <TrendingDownIcon /> 4.3%
              </Box>{" "}
              Down from past week
            </Typography>
          }
        />

        <InfoCard
          label="Total Pending"
          value="2040"
          iconColor={"#ff8026"}
          icon={<RestoreIcon />}
          footer={
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: (theme) => theme.palette.success.main,
                }}
              >
                <TrendingUpIcon /> 1.8%
              </Box>{" "}
              Up from past week
            </Typography>
          }
        />
      </Box>
      <Card sx={{ p: 2 }}>
        <Typography variant="h5">Sales Details</Typography>
        <SalesLineChart />
      </Card>
    </Box>
  );
};

export default Dashboard;
