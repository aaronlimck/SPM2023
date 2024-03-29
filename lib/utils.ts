import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Improved isValidEmail function with a more comprehensive regular expression
export function isValidEmail(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Improved isEmpty function with better whitespace detection
export function isEmpty(str: string): boolean {
  return str.trim() === "";
}

export function isDateInPast(dateTime: Date) {
  // Convert the dateTime string to a Date object
  const dateToCheck = new Date(dateTime);

  // Get the current date and time
  const currentDate = new Date();

  // Compare the dates (ignoring time)
  currentDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
  dateToCheck.setHours(0, 0, 0, 0);
  return dateToCheck < currentDate;
}

export function isLessThanDayAgo(dateTime: Date) {
  // Calculate the current time in milliseconds
  const currentTime = new Date().getTime();
  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - dateTime.getTime();
  // Calculate the number of milliseconds in a day
  const millisecondsInDay = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  // Check if the time difference is less than a day
  return timeDifference < millisecondsInDay;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    // Handle invalid date strings by returning 'Invalid Date'
    return "Invalid Date";
  }

  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const year: string = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}

export const formatDateDifference = (date: Date): string => {
  const currentDate = new Date();
  const targetDate = date;
  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (minutesDifference < 1) {
    return "Just now";
  } else if (minutesDifference < 60) {
    return `${minutesDifference} minute${minutesDifference > 1 ? "s" : ""} ago`;
  } else if (minutesDifference < 60 * 24) {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
  } else if (minutesDifference < 60 * 24 * 7) {
    const daysDifference = Math.floor(minutesDifference / (60 * 24));
    return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Singapore", // Specify Singapore Time (SGT)
    };
    return targetDate.toLocaleDateString("en-US", options);
  }
};

export function dateToDateTime(dateString: string): Date | null {
  const [year, month, day] = dateString.split("-").map(Number);

  // Check if the date components are valid numbers
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    console.error("Invalid date components");
    return null;
  }

  // JavaScript months are 0-indexed, so subtract 1 from the month
  const dateObject = new Date(year, month - 1, day);

  // Check if the Date object is valid
  if (isNaN(dateObject.getTime())) {
    console.error("Invalid date");
    return null;
  }

  return dateObject;
}

export function dateTimeToDate(dateObject: Date): string {
  // Check if the Date object is valid
  if (isNaN(dateObject.getTime())) {
    console.error("Invalid date object");
    return "";
  }

  // Get year, month, and day from the Date object
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Adding 1 because months are 0-indexed
  const day = dateObject.getDate();

  // Format the date string as "YYYY-MM-DD"
  const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return dateString;
}
