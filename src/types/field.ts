import type { FieldValues, Validate, ValidationRule } from "react-hook-form";

export type ValidationRules = {
  required: string | ValidationRule<boolean>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp>;
  validate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>;
};

export type Field = {
  type: FieldType;
  name: string;
  label?: string;
  options?: Option[];
  fields: NestedField[];
  apiConfig?: {
    triggers: string[];
    endpoint: string;
  };
  validations?: ValidationRules;
  disabled?: boolean;
};

export type NestedField = Omit<Field, "fields">;

export type Option = {
  value: string;
  label: string;
};

export const FieldTypes = {
  text: "text",
  textarea: "textarea",
  dropdown: "dropdown",
  checkbox: "checkbox",
  radio: "radio",
  group: "group",
} as const;

type FormFieldTypesMap = typeof FieldTypes;
export type FieldType = FormFieldTypesMap[keyof FormFieldTypesMap];
