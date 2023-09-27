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

export function formatDate(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const year: string = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}
