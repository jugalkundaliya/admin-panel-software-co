import React, { ReactNode } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { SxProps } from "@mui/system";

interface DashboardCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconColor?: string;
  footer?: ReactNode;
  sx?: SxProps;
}

const InfoCard: React.FC<DashboardCardProps> = ({
  label,
  value,
  icon,
  footer,
  sx,
  iconColor,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "250px",
        p: 2,
        borderRadius: 4,
        ...sx,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 0,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Typography color="textSecondary" fontWeight="normal" fontSize={12}>
            {label}
          </Typography>
          <Typography variant="h5" fontWeight="medium">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            fontSize: "2rem",
            color: iconColor,
            background: `${iconColor}40`,
            width: 46,
            height: 46,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
          }}
        >
          {icon}
        </Box>
      </CardContent>
      {footer && <Box sx={{ mt: 4 }}>{footer}</Box>}
    </Card>
  );
};

export default InfoCard;
