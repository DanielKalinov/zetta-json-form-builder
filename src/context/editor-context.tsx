import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Field } from "../types/field";

interface EditorContextType {
  fields: Field[];
  output: {};
  setFields: Dispatch<SetStateAction<Field[]>>;
  setOutput: Dispatch<SetStateAction<{}>>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [output, setOutput] = useState({});

  return (
    <EditorContext.Provider value={{ fields, output, setFields, setOutput }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used inside EditorProvider");
  }
  return context;
};
