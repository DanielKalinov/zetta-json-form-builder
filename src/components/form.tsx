import { Box, Button } from "@mui/material";
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

  return (
    shouldRenderForm && (
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit((data) => console.log(data))}
          sx={{
            mt: 4,
          }}
        >
          <Fields />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
            }}
          >
            Submit
          </Button>
        </Box>
      </FormProvider>
    )
  );
}
