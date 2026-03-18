import type { FieldType } from "./field-types";
import type { ValidationRules } from "./validation-rules";
import type { FieldOption } from "./field-option";

export type Field = {
  type: FieldType;
  name: string;
  label?: string;
  options?: FieldOption[];
  fields?: NestedField[];
  apiConfig?: {
    triggers: string[];
    endpoint: string;
  };
  validations?: ValidationRules;
  disabled?: boolean;
};

export type NestedField = Omit<Field, "fields">;
