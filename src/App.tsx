import "./App.css";
import Header from "./components/header";
import Layout from "./components/layout";
import { EditorProvider } from "./context/editor-context";
import AppContainer from "./components/app-container";

export default function App() {
  return (
    <EditorProvider>
      <AppContainer>
        <Header />
        <Layout />
      </AppContainer>
    </EditorProvider>
  );
}
