import type { Field } from "../../types/field";
import FieldRenderer from "./field-renderer";

export default function Field({ field }: { field: Field }) {
  return <FieldRenderer field={field} />;
}
