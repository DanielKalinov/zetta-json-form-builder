import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Layout from "../components/layout";
import { EditorProvider } from "../context/editor-context";

// 1. Mock child components to keep tests focused on Layout logic
vi.mock("../components/fields", () => ({
  default: () => <div data-testid="fields-mock" />,
}));
vi.mock("../components/editor", () => ({
  default: () => <div data-testid="editor-mock" />,
}));
vi.mock("../components/output", () => ({
  default: () => <div data-testid="output-mock" />,
}));
vi.mock("../components/card", () => ({
  default: ({ children, label }: any) => (
    <div data-testid="card-mock">
      <span>{label}</span>
      {children}
    </div>
  ),
}));

// Helper to render with the real Provider
const renderLayout = () => {
  return render(
    <EditorProvider>
      <Layout />
    </EditorProvider>,
  );
};

// Note: Since EditorProvider starts with [], we might need a way
// to inject fields or just mock the hook for specific states.
import { useEditor } from "../context/editor-context";
vi.mock("../context/editor-context", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../context/editor-context")>();
  return {
    ...actual,
    useEditor: vi.fn(),
  };
});

describe("Layout Component", () => {
  const mockSetOutput = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 'No fields to display' when fields array is empty", () => {
    vi.mocked(useEditor).mockReturnValue({
      fields: [],
      setOutput: mockSetOutput,
      output: {},
      setFields: vi.fn(),
    });

    renderLayout();

    expect(screen.getByText(/no fields to display/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /submit/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the form and fields when fields are present", () => {
    vi.mocked(useEditor).mockReturnValue({
      fields: [{ type: "text", name: "test", label: "Test" }],
      setOutput: mockSetOutput,
      output: {},
      setFields: vi.fn(),
    });

    renderLayout();

    expect(screen.getByTestId("fields-mock")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("calls setOutput with form data on successful submission", async () => {
    vi.mocked(useEditor).mockReturnValue({
      fields: [{ type: "text", name: "test", label: "Test" }],
      setOutput: mockSetOutput,
      output: {},
      setFields: vi.fn(),
    });

    renderLayout();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // It should be called with an object (even if empty in this mock)
      expect(mockSetOutput).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  it("renders the main structural components (Editor and Output)", () => {
    vi.mocked(useEditor).mockReturnValue({
      fields: [],
      setOutput: mockSetOutput,
      output: {},
      setFields: vi.fn(),
    });

    renderLayout();

    expect(screen.getByTestId("editor-mock")).toBeInTheDocument();
    expect(screen.getByTestId("output-mock")).toBeInTheDocument();
  });
});
