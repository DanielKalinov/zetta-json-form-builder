import { Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Output() {
  const { watch } = useFormContext();

  const values = watch();

  return (
    <Paper
      sx={{
        p: 3,
      }}
    >
      <Typography mb={2}>Output (JSON)</Typography>
      <pre>
        <code>{JSON.stringify(values)}</code>
      </pre>
    </Paper>
  );
}
