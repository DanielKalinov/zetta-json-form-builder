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
import { Controller, useFormContext } from "react-hook-form";
import { Fragment } from "react";
import type { Field, NestedField } from "../types/field";
import { useAutoFill } from "../hooks/use-auto-fill";

type FieldRendererProps = {
  field: Field | NestedField;
  parentName?: string;
};

export default function Field({ field }: { field: Field }) {
  return <FieldRenderer field={field} />;
}

function FieldRenderer({ field, parentName }: FieldRendererProps) {
  const { register, control } = useFormContext();

  const {
    type,
    name: fieldName,
    label,
    options,
    disabled,
    apiConfig,
    fields,
  } = field as Field;

  const name = parentName ? `${parentName}.${fieldName}` : fieldName;

  useAutoFill({
    name,
    parentName,
    apiConfig,
  });

  switch (type) {
    case "text":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label={label} disabled={disabled} />
          )}
        />
      );

    case "textarea":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={label}
              multiline
              rows={6}
              disabled={disabled}
            />
          )}
        />
      );

    case "dropdown":
      return (
        <TextField
          {...register(name)}
          select
          label={label}
          defaultValue=""
          disabled={disabled}
        >
          {Array.isArray(options) &&
            options.map(({ value, label }, index) => (
              <MenuItem key={`${value}-${index}`} value={value}>
                {label}
              </MenuItem>
            ))}
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
          <RadioGroup>
            {Array.isArray(options) &&
              options.map(({ value, label }, index) => (
                <FormControlLabel
                  key={`${value}-${index}`}
                  value={value}
                  label={label}
                  control={<Radio {...register(name)} />}
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
              fields.map((child: NestedField, index) => (
                <Fragment key={`${child.name}-${index}`}>
                  <FieldRenderer field={child} parentName={name} />
                </Fragment>
              ))}
          </Stack>
        </Box>
      );

    default:
      return null;
  }
}
