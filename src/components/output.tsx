import { useFormContext } from "react-hook-form";

export default function Output() {
  const {
    getValues,
    formState: { isSubmitted },
  } = useFormContext();

  return (
    isSubmitted && (
      <pre>
        <code>{JSON.stringify(getValues())}</code>
      </pre>
    )
  );
}
