import { useFormContext } from "react-hook-form";
import Card from "./card";

export default function Output() {
  const { watch } = useFormContext();

  const values = watch();

  return (
    <Card
      label="Output (JSON)"
      sx={{
        overflowX: "auto",
      }}
    >
      <pre>
        <code>{JSON.stringify(values)}</code>
      </pre>
    </Card>
  );
}
