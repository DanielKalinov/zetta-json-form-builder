import "./App.css";
import { Container } from "@mui/material";
import Header from "./components/header";
import Editor from "./components/editor";
import Form from "./components/form";
import { EditorProvider } from "./context/editor-context";

export default function App() {
  return (
    <>
      <EditorProvider>
        <Container>
          <Header />
          <Editor />
          <Form />
        </Container>
      </EditorProvider>
    </>
  );
}
