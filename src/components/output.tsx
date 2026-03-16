import Card from "./card";
import { useEditor } from "../context/editor-context";
import { Editor as MonacoEditor } from "@monaco-editor/react";

export default function Output() {
  const { output } = useEditor();

  return (
    <Card label="Output (JSON)">
      <MonacoEditor
        height="10vh"
        value={JSON.stringify(output)}
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
