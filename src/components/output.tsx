import { Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Output() {
  const { getValues } = useFormContext();

  return (
    <Paper
      sx={{
        p: 3,
      }}
    >
      <Typography mb={2}>Output (JSON)</Typography>
      <pre>
        <code>{JSON.stringify(getValues())}</code>
      </pre>
    </Paper>
  );
}
