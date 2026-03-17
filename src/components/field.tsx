import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import type { Field, NestedField } from "../types/field";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

export default function Field({ field }: { field: Field }) {
  const { register } = useFormContext();

  function renderField(passedField: Field | NestedField, isNested?: boolean) {
    const { type, name, label, options, disabled } = passedField;
    const { fields } = passedField as Field;

    const nameRegister = isNested ? `${field.name}.${name}` : name;

    switch (type) {
      case "text":
        return (
          <TextField
            {...register(nameRegister)}
            type="text"
            name={nameRegister}
            label={label}
            disabled={disabled}
          />
        );
      case "textarea":
        return (
          <TextField
            {...register(nameRegister)}
            type="text"
            name={nameRegister}
            label={label}
            multiline
            rows={6}
            disabled={disabled}
          />
        );
      case "dropdown":
        return (
          <TextField
            {...register(nameRegister)}
            select
            name={nameRegister}
            label={label}
            defaultValue=""
            disabled={disabled}
          >
            {(Array.isArray(options) &&
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
            control={
              <Checkbox {...register(nameRegister)} disabled={disabled} />
            }
            label={label}
          />
        );
      case "radio":
        return (
          <FormControl component="fieldset" disabled={disabled}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup name={nameRegister}>
              {Array.isArray(options) &&
                options?.map(({ value, label }, index) => (
                  <FormControlLabel
                    key={`${value}-${index}`}
                    value={value}
                    label={label}
                    control={
                      <Radio {...register(nameRegister)} disabled={disabled} />
                    }
                  />
                ))}
            </RadioGroup>
          </FormControl>
        );
      case "group":
        return (
          <Box
            sx={{
              border: "solid 1px",
              borderRadius: 1,
              p: 2,
            }}
          >
            <Typography
              sx={{
                mb: 3,
              }}
            >
              {label}
            </Typography>
            <Stack gap={2}>
              {Array.isArray(fields) &&
                fields?.map((item: NestedField, index) => (
                  <Fragment key={`${item.name}-${index}`}>
                    {renderField(item, true)}
                  </Fragment>
                ))}
            </Stack>
          </Box>
        );

      default:
        return null;
    }
  }

  return renderField(field);
}
