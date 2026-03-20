import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEditor } from "../context/editor-context";
import { type Field } from "../types/field";
import Card from "./card";
import { useMediaQuery, useTheme } from "@mui/material";
import { validateField } from "../utils/validate-field";

export default function Editor() {
  const { setFields } = useEditor();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  function handleEditorChange(value: string | undefined) {
    if (!value) setFields([]);

    try {
      const parsedFields = JSON.parse(value as string);

      const validatedFields = parsedFields
        .filter(validateField)
        .map((field: Field) => ({
          ...field,
          fields: field.fields?.filter(validateField),
        }));

      setFields(validatedFields);
    } catch {
      // Do nothing
    }
  }

  return (
    <Card
      label="Editor (JSON)"
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: { xs: 1, lg: 2 },
      }}
    >
      <MonacoEditor
        defaultLanguage="json"
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
        }}
        onChange={handleEditorChange}
        height={matches ? "100%" : "50vh"}
      />
    </Card>
  );
}
