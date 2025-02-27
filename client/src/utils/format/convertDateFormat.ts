export function convertDateFormat(dateInput: Date | string | null): string {
  try {
    if (dateInput === null) {
      throw new Error("Date input is null");
    }

    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date input");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}
