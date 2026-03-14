import "./App.css";
import { Container } from "@mui/material";
import Header from "./components/header";
import Editor from "./components/editor";

export default function App() {
  return (
    <>
      <Container>
        <Header />
        <Editor />
      </Container>
    </>
  );
}
