import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEditor } from "../context/editor-context";
import { FieldTypes, type Field } from "../types/field";
import Card from "./card";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Editor() {
  const { setFields } = useEditor();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  function handleEditorChange(value: string | undefined) {
    if (!value) setFields([]);

    try {
      const parsedFields = JSON.parse(value as string);

      function validateField(field: Field) {
        const hasNameAndType = field?.type && field?.name; // If type and name exist and are not empty strings.
        const typeIsValid = Object.values(FieldTypes).includes(field.type); // If the type is one of the valid types defined in FieldTypes.

        if (hasNameAndType && typeIsValid) {
          return true;
        }

        return false;
      }

      const validatedFields = parsedFields.filter((field: Field) =>
        validateField(field),
      );

      setFields(validatedFields);
    } catch {}
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
