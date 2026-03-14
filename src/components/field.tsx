import { TextField } from "@mui/material";
import type { Field } from "../types/field";

export default function Field({ field }: { field: Field }) {
  const { type, name, label, disabled } = field;

  function renderField() {
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

  return renderField();
}
