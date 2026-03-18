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
