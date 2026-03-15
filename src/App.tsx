import "./App.css";
import { Container } from "@mui/material";
import Header from "./components/header";
import Layout from "./components/layout";
import { EditorProvider } from "./context/editor-context";

export default function App() {
  return (
    <EditorProvider>
      <Container>
        <Header />
        <Layout />
      </Container>
    </EditorProvider>
  );
}
