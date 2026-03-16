import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import type { Field } from "../types/field";
import { useFormContext } from "react-hook-form";

export default function Field({ field }: { field: Field }) {
  const { type, name, label, options, disabled } = field;

  const { register } = useFormContext();

  const isArray = Array.isArray(options);

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
            {(isArray &&
              options?.map(({ value, label }, index) => (
                <MenuItem key={`${value}-${index}`} value={value}>
                  {label}
                </MenuItem>
              ))) ||
              []}
          </TextField>
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={<Checkbox {...register(name)} disabled={disabled} />}
            label={label}
          />
        );
      case "radio":
        return (
          <FormControl component="fieldset" disabled={disabled}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup name={name}>
              {isArray &&
                options?.map(({ value, label }, index) => (
                  <FormControlLabel
                    key={`${value}-${index}`}
                    value={value}
                    label={label}
                    control={<Radio {...register(name)} disabled={disabled} />}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        );
      default:
        return null;
    }
  }

  return renderField();
}
