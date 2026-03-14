export type Field = {
  type: FieldType;
  name: string;
  label?: string;
  disabled?: boolean;
};

export const FieldTypes = {
  text: "text",
  textarea: "textarea",
  dropdown: "dropdown",
  checkbox: "checkbox",
  radioButton: "radio-button",
} as const;

type FormFieldTypesMap = typeof FieldTypes;
export type FieldType = FormFieldTypesMap[keyof FormFieldTypesMap];
