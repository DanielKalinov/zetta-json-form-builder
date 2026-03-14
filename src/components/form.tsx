import { Box, Button } from "@mui/material";
import { useEditor } from "../context/editor-context";
import Fields from "./fields";

export default function Form() {
  const { fields } = useEditor();

  const shouldRenderForm = fields.length > 0;

  return (
    shouldRenderForm && (
      <Box
        component="form"
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
    )
  );
}
