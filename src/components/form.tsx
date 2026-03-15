import { Box, Button, Typography } from "@mui/material";
import { useEditor } from "../context/editor-context";
import Fields from "./fields";
import { FormProvider, useForm } from "react-hook-form";

export default function Form() {
  const { fields } = useEditor();
  const methods = useForm({
    // This ensures that when a field is removed from the form, its value is also removed from the form state.
    shouldUnregister: true,
  });

  const shouldRenderForm = fields.length > 0;

  return shouldRenderForm ? (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit((data) => console.log(data))}
        sx={{
          flex: 1,
        }}
      >
        <Fields />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            width: "100%",
          }}
        >
          Submit
        </Button>
      </Box>
    </FormProvider>
  ) : (
    <Box
      sx={{
        flex: 1,
      }}
    >
      <Typography>No fields to display</Typography>
    </Box>
  );
}
