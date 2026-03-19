import { useWatch, type Control } from "react-hook-form";
import type { FieldCondition } from "../types/field";

export const useFieldVisibility = (
  condition: FieldCondition | undefined,
  control: Control<any>,
) => {
  // If there's no condition, we don't need to watch anything
  const watchedValue = useWatch({
    control,
    name: condition?.watch || "",
    disabled: !condition,
  });

  // Calculate visibility
  // If no condition, it's always visible (true)
  const isVisible = condition ? watchedValue === condition.is : true;

  return isVisible;
};
