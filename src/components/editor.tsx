import { Paper } from "@mui/material";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEditor } from "../context/editor-context";

export default function Editor() {
  const { setFields } = useEditor();

  function handleEditorChange(value: string | undefined) {
    if (!value) setFields([]);

    try {
      const parsedFields = JSON.parse(value as string);
      setFields(parsedFields);
    } catch {}
  }

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <MonacoEditor
        height="50vh"
        defaultLanguage="json"
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
        }}
        onChange={handleEditorChange}
      />
    </Paper>
  );
}
