import { Divider, Paper, Typography, type SxProps } from "@mui/material";
import type { ReactNode } from "react";

export default function Card({
  label = "",
  children,
  sx,
}: {
  label: string;
  children: ReactNode;
  sx: SxProps;
}) {
  return (
    <Paper
      sx={{
        p: 3,
        ...sx,
      }}
      elevation={3}
    >
      <Typography mb={3}>{label}</Typography>
      {children}
    </Paper>
  );
}
