import type { FieldType } from "./field-types";
import type { ValidationRules } from "./validation-rules";
import type { FieldOption } from "./field-option";
import type { FieldCondition } from "./field-condition";

export type Field = {
  type: FieldType;
  name: string;
  label?: string;
  options?: FieldOption[];
  fields?: NestedField[];
  condition?: FieldCondition;
  apiConfig?: {
    triggers: string[];
    endpoint: string;
  };
  validations?: ValidationRules;
  disabled?: boolean;
};

export type NestedField = Omit<Field, "fields">;
