export type Field = {
  type: FieldType;
  name: string;
  label?: string;
  options?: Option[];
  disabled?: boolean;
};

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
} as const;

type FormFieldTypesMap = typeof FieldTypes;
export type FieldType = FormFieldTypesMap[keyof FormFieldTypesMap];
