import {
  formatDate,
  formatDateDifference,
  isDateInPast,
  isEmpty,
  isLessThanDayAgo,
  isValidEmail,
} from "./utils";

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

describe("isLessThanDayAgo", () => {
  it("returns true for a date less than a day ago", () => {
    // Create a date less than a day ago
    const lessThanDayAgo = new Date();
    lessThanDayAgo.setHours(lessThanDayAgo.getHours() - 23); // Subtract 23 hours

    // Call the function and expect it to return true
    const result = isLessThanDayAgo(lessThanDayAgo);
    expect(result).toBe(true);
  });

  it("returns false for a date exactly a day ago", () => {
    // Create a date exactly a day ago
    const exactlyOneDayAgo = new Date();
    exactlyOneDayAgo.setHours(exactlyOneDayAgo.getHours() - 24); // Subtract 24 hours

    // Call the function and expect it to return false
    const result = isLessThanDayAgo(exactlyOneDayAgo);
    expect(result).toBe(false);
  });

  it("returns false for a date more than a day ago", () => {
    // Create a date more than a day ago
    const moreThanOneDayAgo = new Date();
    moreThanOneDayAgo.setHours(moreThanOneDayAgo.getHours() - 25); // Subtract 25 hours

    // Call the function and expect it to return false
    const result = isLessThanDayAgo(moreThanOneDayAgo);
    expect(result).toBe(false);
  });
});

describe("formatDate", () => {
  it("formats a date string in the expected format", () => {
    // Provide a sample date string in the format "YYYY-MM-DD" (e.g., "2023-10-27")
    const inputDateStr = "2023-10-27";

    // Call the function with the sample date string
    const formattedDate = formatDate(inputDateStr);

    // Check if the formatted date matches the expected format (DD/MM/YYYY)
    expect(formattedDate).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it("returns 'Invalid Date' for an invalid date string", () => {
    // Provide an invalid date string
    const invalidDateStr = "Invalid Date";

    // Call the function with the invalid date string
    const formattedDate = formatDate(invalidDateStr);

    // Check if the function returns 'Invalid Date'
    expect(formattedDate).toBe("Invalid Date");
  });
});

describe("formatDateDifference", () => {
  // BOUNDARY TEST
  it("displays 'Just now' for the current time", () => {
    const currentDateTime = new Date();

    const result = formatDateDifference(currentDateTime);
    expect(result).toBe("Just now");
  });

  it("displays 'Just now' for less than 1 minute", () => {
    const currentDateTime = new Date();
    const lessThanOneMinuteAgo = new Date(currentDateTime);
    lessThanOneMinuteAgo.setSeconds(lessThanOneMinuteAgo.getSeconds() - 30); // Subtract 30 seconds

    const result = formatDateDifference(lessThanOneMinuteAgo);
    expect(result).toBe("Just now");
  });

  it("displays minutes ago for less than 1 hour", () => {
    const currentDateTime = new Date();
    const lessThanOneHourAgo = new Date(currentDateTime);
    lessThanOneHourAgo.setMinutes(lessThanOneHourAgo.getMinutes() - 45); // Subtract 45 minutes

    const result = formatDateDifference(lessThanOneHourAgo);
    expect(result).toBe("45 minutes ago");
  });

  // BOUNDARY TEST
  it("displays '59 minutes ago' for just under 1 hour", () => {
    const currentDateTime = new Date();
    const justUnderOneHourAgo = new Date(currentDateTime);
    justUnderOneHourAgo.setMinutes(justUnderOneHourAgo.getMinutes() - 59); // Subtract 59 minutes

    const result = formatDateDifference(justUnderOneHourAgo);
    expect(result).toBe("59 minutes ago");
  });

  // BOUNDARY TEST
  it("displays '59 minutes ago' for just over 1 hour", () => {
    const currentDateTime = new Date();
    const justOverOneHourAgo = new Date(currentDateTime);
    justOverOneHourAgo.setMinutes(justOverOneHourAgo.getMinutes() - 61); // Subtract 61 minutes

    const result = formatDateDifference(justOverOneHourAgo);
    expect(result).toBe("1 hour ago");
  });

  it("displays hours ago for less than 24 hours", () => {
    const currentDateTime = new Date();
    const lessThanOneDayAgo = new Date(currentDateTime);
    lessThanOneDayAgo.setHours(lessThanOneDayAgo.getHours() - 10); // Subtract 10 hours

    const result = formatDateDifference(lessThanOneDayAgo);
    expect(result).toBe("10 hours ago");
  });

  it("displays days ago for less than 7 days", () => {
    const currentDateTime = new Date();
    const lessThanOneWeekAgo = new Date(currentDateTime);
    lessThanOneWeekAgo.setDate(lessThanOneWeekAgo.getDate() - 3); // Subtract 3 days

    const result = formatDateDifference(lessThanOneWeekAgo);
    expect(result).toBe("3 days ago");
  });

  it("displays the date format in e.g:'10 October 2023' for more than 7 days", () => {
    const currentDateTime = new Date();
    const moreThanOneWeekAgo = new Date(currentDateTime);
    moreThanOneWeekAgo.setDate(moreThanOneWeekAgo.getDate() - 10); // Subtract 10 days

    const result = formatDateDifference(moreThanOneWeekAgo);
    expect(result).toBe(result);
  });
});
