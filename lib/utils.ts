import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertToDate = (dateStr: string): Date | undefined => {
  const [day, month, year] = dateStr.split('/').map(Number);
  if (!day || !month || !year) {
    console.error("Invalid date format");
    return undefined;
  }
  return new Date(year, month - 1, day); // Month is zero-based in JavaScript
};

export function formatDateToDDMMYYYY(dateInput: Date | string): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const day = String(date.getUTCDate()).padStart(2, '0'); // Two-digit day
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Two-digit month
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}