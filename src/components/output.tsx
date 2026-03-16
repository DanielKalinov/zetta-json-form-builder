import Card from "./card";
import { useEditor } from "../context/editor-context";

export default function Output() {
  const { output } = useEditor();

  return (
    <Card
      label="Output (JSON)"
      sx={{
        overflowX: "auto",
      }}
    >
      <pre>
        <code>{JSON.stringify(output)}</code>
      </pre>
    </Card>
  );
}
