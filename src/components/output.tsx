import Card from "./card";
import { useEditor } from "../context/editor-context";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useOutputAnimation } from "../hooks/use-output-animation";

export default function Output() {
  const { output } = useEditor();
  const { sx } = useOutputAnimation(output);

  return (
    <Card label="Output (JSON)" sx={sx}>
      <MonacoEditor
        height="10vh"
        value={JSON.stringify(output, null, 2)}
        defaultLanguage="json"
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          readOnly: true,
        }}
      />
    </Card>
  );
}
