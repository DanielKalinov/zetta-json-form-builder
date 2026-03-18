import { useFormContext, useWatch } from "react-hook-form";
import type { Field } from "../types/field";
import { fetchMock } from "../utils/fetch-mock";
import { useEffect } from "react";

interface useAutoFillProps {
  name: Field["name"];
  parentName?: string;
  apiConfig: Field["apiConfig"];
}

export function useAutoFill({ name, parentName, apiConfig }: useAutoFillProps) {
  const { control, setValue } = useFormContext();

  const resolvedTriggers =
    apiConfig?.triggers?.map((trigger) =>
      parentName ? `${parentName}.${trigger}` : trigger,
    ) || [];

  const watchedValues = useWatch({
    control,
    name: resolvedTriggers,
  });

  const allFilled =
    watchedValues.length > 0 && watchedValues.every((value) => value);

  useEffect(() => {
    if (allFilled && apiConfig?.endpoint) {
      fetchMock(apiConfig.endpoint).then((res) => {
        setValue(name, res.value);
      });
    }
  }, [allFilled, apiConfig?.endpoint, name, setValue]);
}
