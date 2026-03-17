import { useFormContext, useWatch } from "react-hook-form";
import type { Field } from "../types/field";
import { fetchMock } from "../utils/fetch-mock";

interface useAutoFillProps {
  name: Field["name"];
  apiConfig: Field["apiConfig"];
}

export function useAutoFill({ name, apiConfig }: useAutoFillProps) {
  const { control, setValue } = useFormContext();

  const watchedValues = useWatch({
    control,
    name: apiConfig?.triggers || [],
  });

  const allFilled =
    watchedValues.length > 0 && watchedValues.every((value) => value);

  if (allFilled && apiConfig?.endpoint) {
    fetchMock(apiConfig.endpoint).then((res) => {
      setValue(name, res.value);
    });
  }
}
