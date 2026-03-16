import Card from "./card";
import { useEditor } from "../context/editor-context";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useOutputAnimation } from "../hooks/use-output-animation";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Output() {
  const { output } = useEditor();
  const { sx } = useOutputAnimation(output);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card label="Output (JSON)" sx={sx}>
      <MonacoEditor
        value={JSON.stringify(output, null, 2)}
        defaultLanguage="json"
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          readOnly: true,
        }}
        height={matches ? "10vh" : "25vh"}
      />
    </Card>
  );
}
