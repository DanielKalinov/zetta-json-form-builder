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
  FormHelperText,
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
  const { control } = useFormContext();

  const {
    type,
    name: fieldName,
    label,
    options,
    fields,
    apiConfig,
    validations,
    disabled,
  } = field as Field;

  const name = parentName ? `${parentName}.${fieldName}` : fieldName;

  const required = Boolean(validations?.required);

  const { loading } = useAutoFill({
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
          rules={{
            ...validations,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label={label}
              error={!!error}
              helperText={error?.message}
              required={required}
              disabled={disabled || loading}
            />
          )}
        />
      );

    case "textarea":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{ ...validations }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label={label}
              multiline
              rows={6}
              error={!!error}
              helperText={error?.message}
              required={required}
              disabled={disabled || loading}
            />
          )}
        />
      );

    case "dropdown":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{ ...validations }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              select
              label={label}
              error={!!error}
              helperText={error?.message}
              required={required}
              disabled={disabled || loading}
            >
              {Array.isArray(options) &&
                options.map(({ value, label }, index) => (
                  <MenuItem key={`${value}-${index}`} value={value}>
                    {label}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
      );

    case "checkbox":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={false}
          rules={{ ...validations }}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <FormControlLabel
                control={<Checkbox {...field} disabled={disabled || loading} />}
                label={label}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </Box>
          )}
        />
      );

    case "radio":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{ ...validations }}
          render={({ field, fieldState: { error } }) => (
            <FormControl
              component="fieldset"
              disabled={disabled || loading}
              error={!!error}
            >
              <FormLabel component="legend" required={required}>
                {label}
              </FormLabel>
              <RadioGroup {...field}>
                {Array.isArray(options) &&
                  options.map(({ value, label }, index) => (
                    <FormControlLabel
                      key={`${value}-${index}`}
                      value={value}
                      label={label}
                      control={<Radio />}
                    />
                  ))}
              </RadioGroup>
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />
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
