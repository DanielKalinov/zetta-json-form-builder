import { Paper, Typography, type SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export default function Card({
  label = "",
  children,
  sx,
}: {
  label: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Paper
      sx={{
        p: 3,
        ...sx,
      }}
      elevation={3}
    >
      <Typography
        sx={{
          mb: 3,
          fontWeight: "medium",
        }}
      >
        {label}
      </Typography>
      {children}
    </Paper>
  );
}
