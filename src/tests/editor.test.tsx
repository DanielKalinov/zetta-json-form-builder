import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Editor from "../components/editor";
import { useEditor } from "../context/editor-context";
import { FieldTypes } from "../types/field-types";

// 1. Mock the Context Hook
vi.mock("../context/editor-context", () => ({
  useEditor: vi.fn(),
}));

// 2. Mock Monaco Editor
vi.mock("@monaco-editor/react", () => ({
  Editor: ({ onChange }: any) => (
    <textarea
      data-testid="mock-monaco"
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

// 3. Mock MUI useMediaQuery (optional, but keeps logs clean)
vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: vi.fn(() => true),
  };
});

describe("Editor Component", () => {
  const mockSetFields = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useEditor as any).mockReturnValue({
      setFields: mockSetFields,
    });
  });

  it("parses valid JSON and updates fields", () => {
    render(<Editor />);
    const editor = screen.getByTestId("mock-monaco");

    const validJson = JSON.stringify([
      { name: "username", type: FieldTypes["text"] },
      { name: "age", type: FieldTypes["text"] },
    ]);

    fireEvent.change(editor, { target: { value: validJson } });

    expect(mockSetFields).toHaveBeenCalledWith([
      { name: "username", type: FieldTypes["text"] },
      { name: "age", type: FieldTypes["text"] },
    ]);
  });

  it("filters out fields with invalid types or missing names", () => {
    render(<Editor />);
    const editor = screen.getByTestId("mock-monaco");

    const mixedJson = JSON.stringify([
      { name: "valid", type: FieldTypes["text"] },
      { name: "invalid-type", type: "non-existent-type" },
      { name: "", type: FieldTypes["text"] }, // missing name
      { type: FieldTypes["text"] }, // missing name property entirely
    ]);

    fireEvent.change(editor, { target: { value: mixedJson } });

    expect(mockSetFields).toHaveBeenCalledWith([
      { name: "valid", type: FieldTypes["text"] },
    ]);
  });

  it("validates nested fields within a field", () => {
    render(<Editor />);
    const editor = screen.getByTestId("mock-monaco");

    const nestedJson = JSON.stringify([
      {
        name: "address",
        type: FieldTypes["group"],
        fields: [
          { name: "street", type: FieldTypes["text"] },
          { name: "zip", type: "invalid" }, // Should be filtered out
        ],
      },
    ]);

    fireEvent.change(editor, { target: { value: nestedJson } });

    expect(mockSetFields).toHaveBeenCalledWith([
      {
        name: "address",
        type: FieldTypes["group"],
        fields: [{ name: "street", type: FieldTypes["text"] }],
      },
    ]);
  });

  it("does not crash and does not call setFields on invalid JSON syntax", () => {
    render(<Editor />);
    const editor = screen.getByTestId("mock-monaco");

    // Invalid JSON (missing closing bracket)
    fireEvent.change(editor, { target: { value: '[{ "name": "test" }' } });

    // Should not call setFields because the catch block is empty
    expect(mockSetFields).not.toHaveBeenCalledWith(expect.anything());
  });
});
