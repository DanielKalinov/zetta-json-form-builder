import { Box, Button, Typography } from "@mui/material";
import { useEditor } from "../context/editor-context";
import Fields from "./fields";
import { FormProvider, useForm } from "react-hook-form";
import Editor from "./editor";
import Output from "./output";
import Card from "./card";

export default function Layout() {
  const { fields, setOutput } = useEditor();
  const methods = useForm({
    // This ensures that when a field is removed from the form, its value is also removed from the form state.
    shouldUnregister: true,
  });

  const shouldRenderForm = fields.length > 0;

  const form = shouldRenderForm ? (
    <Box
      component="form"
      onSubmit={methods.handleSubmit((data) => setOutput(data))}
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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            gap: 3,
          }}
        >
          <Editor />
          <Card label="Form" sx={{ flex: 1 }}>
            {form}
          </Card>
        </Box>
        <Output />
      </Box>
    </FormProvider>
  );
}
