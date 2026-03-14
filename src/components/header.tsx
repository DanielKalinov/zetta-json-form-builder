import { Box, Typography } from "@mui/material";
import logo from "../assets/zetta-logo.svg";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        py: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
        }}
      >
        JSON Form Builder
      </Typography>
      <Logo />
    </Box>
  );
}

const Logo = () => (
  <Box
    component="img"
    src={logo}
    alt="Zetta"
    sx={{
      width: 150,
    }}
  />
);
