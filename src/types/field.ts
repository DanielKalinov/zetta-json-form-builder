export type Field = {
  type: FieldType;
  name: string;
  label: string;
  disabled: boolean;
};

export type FieldType =
  | "text"
  | "textarea"
  | "dropdown"
  | "checkbox"
  | "radio-button";
