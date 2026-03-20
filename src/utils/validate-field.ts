import type { Field, NestedField } from "../types/field";
import { FieldTypes } from "../types/field-types";

export function validateField(field: Field | NestedField) {
  const hasNameAndType = field?.type && field?.name; // If type and name exist and are not empty strings.
  const typeIsValid = Object.values(FieldTypes).includes(field.type); // If the type is one of the valid types defined in FieldTypes.

  if (hasNameAndType && typeIsValid) {
    return true;
  }

  return false;
}
