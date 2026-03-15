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
import type { Option, Field } from "../types/field";
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
            {options?.map(({ value, label }: Option) => (
              <MenuItem key={uuidv4()} value={value}>
                {label}
              </MenuItem>
            )) || []}
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
              {options?.map((option) => (
                <FormControlLabel
                  key={uuidv4()}
                  value={option.value}
                  label={option.label}
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
