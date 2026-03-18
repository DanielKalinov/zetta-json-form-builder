import { useFormContext, useWatch } from "react-hook-form";
import type { Field } from "../types/field";
import { fetchMock } from "../utils/fetch-mock";
import { useEffect, useState } from "react";

interface useAutoFillProps {
  name: Field["name"];
  parentName?: string;
  apiConfig: Field["apiConfig"];
}

export function useAutoFill({ name, parentName, apiConfig }: useAutoFillProps) {
  const { control, setValue } = useFormContext();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      fetchMock(apiConfig.endpoint).then((res) => {
        setValue(name, res.value);

        setLoading(false);
      });
    }
  }, [allFilled, apiConfig?.endpoint, name, setValue]);

  return { loading };
}
