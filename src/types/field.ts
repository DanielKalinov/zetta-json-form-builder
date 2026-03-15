export type Field = {
  type: FieldType;
  name: string;
  label?: string;
  options?: DropdownOption[];
  disabled?: boolean;
};

export type DropdownOption = {
  value: string;
  label: string;
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
