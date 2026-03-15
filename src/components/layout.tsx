import { Box, Button, Paper, Typography } from "@mui/material";
import { useEditor } from "../context/editor-context";
import Fields from "./fields";
import { FormProvider, useForm } from "react-hook-form";
import Editor from "./editor";
import Output from "./output";

export default function Layout() {
  const { fields } = useEditor();
  const methods = useForm({
    // This ensures that when a field is removed from the form, its value is also removed from the form state.
    shouldUnregister: true,
  });

  const shouldRenderForm = fields.length > 0;

  const form = shouldRenderForm ? (
    <Box
      component="form"
      onSubmit={methods.handleSubmit((data) => console.log(data))}
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
  ) : (
    <Typography>No fields to display</Typography>
  );

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
          }}
        >
          <Editor />
          <Paper
            sx={{
              p: 3,
              flex: 1,
            }}
          >
            <Typography mb={2}>Form</Typography>
            {form}
          </Paper>
        </Box>
        <Output />
      </Box>
    </FormProvider>
  );
}
