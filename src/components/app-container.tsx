import { Container } from "@mui/material";
import type { ReactNode } from "react";

export default function AppContainer({ children }: { children: ReactNode }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        pb: 3,
      }}
    >
      {children}
    </Container>
  );
}
