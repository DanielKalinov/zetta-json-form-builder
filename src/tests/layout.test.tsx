import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import Layout from "../components/layout";
import { useEditor } from "../context/editor-context";

vi.mock("../context/editor-context", () => ({
  useEditor: vi.fn(),
}));

// Mock sub-components to keep the test focused on Layout logic
vi.mock("../components/editor", () => ({
  default: () => <div data-testid="editor" />,
}));
vi.mock("../components/fields", () => ({
  default: () => <input data-testid="fields-input" name="testField" />,
}));
vi.mock("../components/output", () => ({
  default: () => <div data-testid="output" />,
}));

describe("Layout Component", () => {
  const mockSetOutput = vi.fn();

  it("shows 'No fields' message when editor is empty", () => {
    (useEditor as any).mockReturnValue({
      fields: [],
      setOutput: mockSetOutput,
    });

    render(<Layout />);
    expect(screen.getByText(/No fields to display/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /submit/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the form and submits data correctly", async () => {
    // Simulate having one text field
    (useEditor as any).mockReturnValue({
      fields: [{ name: "testField", type: "text" }],
      setOutput: mockSetOutput,
    });

    render(<Layout />);

    // Check if form elements appeared
    expect(screen.getByTestId("fields-input")).toBeInTheDocument();
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    // Simulate user input and submission
    fireEvent.change(screen.getByTestId("fields-input"), {
      target: { value: "Hello World" },
    });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSetOutput).toHaveBeenCalledWith(
        expect.objectContaining({
          testField: "Hello World",
        }),
      );
    });
  });
});
