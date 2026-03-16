import { Stack } from "@mui/material";
import { useEditor } from "../context/editor-context";
import Field from "./field";

export default function Fields() {
  const { fields } = useEditor();

  return (
    <Stack gap={2}>
      {fields.map((field, index) => (
        <Field key={`${field.name}-${index}`} field={field} />
      ))}
    </Stack>
  );
}
