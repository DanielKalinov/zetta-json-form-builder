import { TextField, MenuItem } from "@mui/material";
import type { DropdownOption, Field } from "../types/field";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function Field({ field }: { field: Field }) {
  const { type, name, label, options, disabled } = field;
  const { register } = useFormContext();

  function renderField() {
    switch (type) {
      case "text":
        return (
          <TextField
            {...register(name)}
            type="text"
            name={name}
            label={label}
            disabled={disabled}
          />
        );
      case "textarea":
        return (
          <TextField
            {...register(name)}
            type="text"
            name={name}
            label={label}
            multiline
            rows={6}
            disabled={disabled}
          />
        );
      case "dropdown":
        return (
          <TextField
            {...register(name)}
            select
            name={name}
            label={label}
            defaultValue=""
            disabled={disabled}
          >
            {options?.map(({ value, label }: DropdownOption) => (
              <MenuItem key={uuidv4()} value={value}>
                {label}
              </MenuItem>
            )) || []}
          </TextField>
        );
      default:
        return null;
    }
  }

  return renderField();
}
