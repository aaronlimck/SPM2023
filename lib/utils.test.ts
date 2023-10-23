import { isDateInPast, isEmpty, isValidEmail } from "./utils";

describe("isValidEmail Function", () => {
  it("returns TRUE for valid email", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("returns FALSE for invalid email - Missing @", () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });

  it("returns FALSE for invalid email - Missing domain", () => {
    expect(isValidEmail("user@.com")).toBe(false);
  });

  it("returns FALSE for invalid email - Missing username", () => {
    expect(isValidEmail("@example.com")).toBe(false);
  });

  it("returns FALSE for invalid email - Multiple @ symbols", () => {
    expect(isValidEmail("user@exam@ple.com")).toBe(false);
  });

  it("returns FALSE for invalid email - Special characters not allowed", () => {
    expect(isValidEmail("user@exa!mple.com")).toBe(false);
  });

  it("returns FALSE for invalid email - Ending with dot", () => {
    expect(isValidEmail("user@example.com.")).toBe(false);
  });
});

describe("isEmpty Function", () => {
  it("returns TRUE for empty strings", () => {
    expect(isEmpty("")).toBe(true);
  });

  it("returns FALSE for empty strings", () => {
    expect(isEmpty("Not Empty")).toBe(false);
  });
});

describe("isDateInPast Function", () => {
  it("returns TRUE for dates in the past", () => {
    const pastDate = new Date("2020-01-01");
    expect(isDateInPast(pastDate)).toBe(true);
  });

  it("returns FALSE for today's date", () => {
    const currentDate = new Date();
    expect(isDateInPast(currentDate)).toBe(false);
  });
});
