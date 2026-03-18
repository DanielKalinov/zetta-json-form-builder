export const customValidations: Record<
  string,
  (value: string) => boolean | string
> = {
  minLength5: (value: string) =>
    value.length >= 5 || "Must be at least 5 characters",

  noSpaces: (value: string) => !/\s/.test(value) || "No spaces allowed",

  maxLength20: (value: string) =>
    value.length <= 20 || "Must be at most 20 characters",

  onlyLetters: (value: string) =>
    /^[a-zA-Z]+$/.test(value) || "Only letters are allowed",

  onlyNumbers: (value: string) =>
    /^[0-9]+$/.test(value) || "Only numbers are allowed",

  emailFormat: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Must be a valid email address",

  containsNumber: (value: string) =>
    /\d/.test(value) || "Must contain at least one number",

  containsSpecialChar: (value: string) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
    "Must contain at least one special character",

  startsWithCapital: (value: string) =>
    /^[A-Z]/.test(value) || "Must start with a capital letter",

  noConsecutiveSpaces: (value: string) =>
    !/\s{2,}/.test(value) || "Cannot contain consecutive spaces",
};
