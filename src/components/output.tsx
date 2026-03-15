import { Paper } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Output() {
  const { getValues } = useFormContext();

  return (
    <Paper
      sx={{
        p: 3,
      }}
    >
      <pre>
        <code>{JSON.stringify(getValues())}</code>
      </pre>
    </Paper>
  );
}
