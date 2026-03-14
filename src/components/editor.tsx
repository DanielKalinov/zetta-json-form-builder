import { Paper } from "@mui/material";
import { Editor as MonacoEditor } from "@monaco-editor/react";

export default function Editor() {
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
      />
    </Paper>
  );
}
