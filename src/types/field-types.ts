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
