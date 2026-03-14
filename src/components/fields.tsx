import { Stack } from "@mui/material";
import { useEditor } from "../context/editor-context";
import Field from "./field";
import { v4 as uuidv4 } from "uuid";

export default function Fields() {
  const { fields } = useEditor();

  return (
    <Stack gap={2}>
      {fields.map((field) => (
        <Field key={uuidv4()} field={field} />
      ))}
    </Stack>
  );
}
