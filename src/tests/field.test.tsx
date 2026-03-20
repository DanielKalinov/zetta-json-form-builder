import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import Field from "../components/field";

// --- Mocks ---
vi.mock("../hooks/use-auto-fill", () => ({
  useAutoFill: vi.fn(() => ({ loading: false })),
}));

vi.mock("../hooks/use-validation-rules", () => ({
  useValidationRules: vi.fn(() => ({})),
}));

import { useFieldVisibility } from "../hooks/use-field-visibility";
vi.mock("../hooks/use-field-visibility", () => ({
  useFieldVisibility: vi.fn(),
}));

import { useAutoFill } from "../hooks/use-auto-fill";

// --- Helper ---
const renderField = (fieldProps: any) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(
    <Wrapper>
      <Field field={fieldProps} />
    </Wrapper>,
  );
};

describe("Field Component Complete Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default to visible so tests don't return null by accident
    vi.mocked(useFieldVisibility).mockReturnValue(true);
  });

  // 1. Visibility Logic
  it("returns null when visibility condition is not met", () => {
    vi.mocked(useFieldVisibility).mockReturnValue(false);
    renderField({ type: "text", name: "test", label: "Hidden" });

    expect(screen.queryByLabelText(/hidden/i)).not.toBeInTheDocument();
  });

  // 2. Text Input
  it("renders a standard text field", () => {
    renderField({ type: "text", name: "username", label: "Username" });
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  // 3. Textarea
  it("renders a textarea with multiline attributes", () => {
    renderField({ type: "textarea", name: "bio", label: "Biography" });
    const textarea = screen.getByLabelText(/biography/i);
    expect(textarea).toBeInTheDocument();
    // In MUI, multiline TextFields render as 'textarea' tags
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  // 4. Dropdown (Select)
  it("renders a dropdown with menu items", () => {
    const options = [{ value: "1", label: "Option One" }];
    renderField({
      type: "dropdown",
      name: "choice",
      label: "Pick One",
      options,
    });

    // MUI Select uses a button role for the display of the select
    expect(screen.getByLabelText(/pick one/i)).toBeInTheDocument();
  });

  // 5. Checkbox
  it("renders a checkbox and its label", () => {
    renderField({ type: "checkbox", name: "agree", label: "I Agree" });
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText(/i agree/i)).toBeInTheDocument();
  });

  // 6. Radio Group
  it("renders all radio options within a group", () => {
    const options = [
      { value: "a", label: "Apple" },
      { value: "b", label: "Banana" },
    ];
    renderField({
      type: "radio",
      name: "fruit",
      label: "Select Fruit",
      options,
    });

    expect(screen.getByText(/select fruit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apple/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/banana/i)).toBeInTheDocument();
  });

  // 7. Group (Nested Fields)
  it("renders nested fields with correct dot-notation names", () => {
    const groupField = {
      type: "group",
      name: "address",
      label: "User Address",
      fields: [{ type: "text", name: "street", label: "Street Name" }],
    };
    renderField(groupField);

    expect(screen.getByText(/user address/i)).toBeInTheDocument();
    // Critical: checking that the name is address.street
    const input = screen.getByLabelText(/street name/i);
    expect(input).toHaveAttribute("name", "address.street");
  });

  // 8. Loading State (Auto-Fill)
  it("disables input when the auto-fill hook is loading", () => {
    vi.mocked(useAutoFill).mockReturnValue({ loading: true });

    renderField({ type: "text", name: "loadingField", label: "Loading" });
    expect(screen.getByLabelText(/loading/i)).toBeDisabled();
  });
});
