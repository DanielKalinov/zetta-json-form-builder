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
  required?: boolean;
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
