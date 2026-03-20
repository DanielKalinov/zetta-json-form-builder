import type { ValidationRules } from "../types/validation-rules";
import { customValidations } from "../utils/custom-validations";

export function useValidationRules(validations?: ValidationRules) {
  if (!validations) return undefined;

  return {
    ...validations,
    validate: Array.isArray(validations.validate)
      ? Object.fromEntries(
          validations.validate.map((name: string) => [
            name,
            customValidations[name],
          ]),
        )
      : validations.validate,
  };
}
