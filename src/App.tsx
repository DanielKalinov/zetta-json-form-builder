import "./App.css";
import { Box, Container } from "@mui/material";
import Header from "./components/header";
import Editor from "./components/editor";
import Form from "./components/form";
import { EditorProvider } from "./context/editor-context";

export default function App() {
  return (
    <EditorProvider>
      <Container>
        <Header />
        <Box sx={{ display: "flex", gap: 4 }}>
          <Editor />
          <Form />
        </Box>
      </Container>
    </EditorProvider>
  );
}
