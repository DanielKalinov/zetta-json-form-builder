import { Box, Button, Stack, TextField } from "@mui/material";
import type { Field } from "../types/field";
import { Fragment } from "react/jsx-runtime";
import { v4 as uuidv4 } from "uuid";
import { useEditor } from "../context/editor-context";

export default function Form() {
  const { fields } = useEditor();

  function renderField({ type, name, label, disabled }: Field) {
    switch (type) {
      case "text":
        return (
          <TextField
            type="text"
            name={name}
            label={label}
            disabled={disabled}
          />
        );
      case "textarea":
        return (
          <TextField
            type="text"
            name={name}
            label={label}
            multiline
            rows={6}
            disabled={disabled}
          />
        );
      default:
        return null;
    }
  }

  return (
    fields.length > 0 && (
      <Box
        component="form"
        sx={{
          mt: 4,
        }}
      >
        <Stack gap={2}>
          {fields.map((item) => (
            <Fragment key={uuidv4()}>{renderField(item)}</Fragment>
          ))}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    )
  );
}
