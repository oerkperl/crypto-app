export const formatMoney = (value: number): string => {
  if (value >= 1_000_000_000_000) {
    const trillionValue = value / 1_000_000_000_000;
    return `${trillionValue.toFixed(1)} T`;
  } else if (value >= 1_000_000_000) {
    const billionValue = value / 1_000_000_000;
    return `${billionValue.toFixed(1)} B`;
  } else if (value >= 1_000_000) {
    const millionValue = value / 1_000_000;
    return `${millionValue.toFixed(1)} M`;
  } else if (value >= 1_000) {
    const thousandValue = value / 1_000;
    return `${thousandValue.toFixed(1)} K`;
  } else {
    return `${value?.toFixed(1)}Qd`;
  }
};

export const getNumberOfDays = (timePeriod: string): number => {
  switch (timePeriod) {
    case "1D":
      return 1;
    case "7D":
      return 7;
    case "14D":
      return 14;
    case "1M":
      return 30;
    case "1Y":
      return 365;
    case "6M":
      return 365 / 2;
    case "3M":
      return 365 / 4;
    default:
      throw new Error("Invalid time period option");
  }
};

export function getCurrentDate(): string {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate: string = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(currentDate);
  return formattedDate;
}

export function extractKeys<T>(array: T[], key: keyof T): Array<T[keyof T]> {
  return array.map((item) => item[key]);
}

export function removeDuplicates<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const itemKey = item[key];
    if (!seen.has(itemKey)) {
      seen.add(itemKey);
      return true;
    }
    return false;
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const calculatPriceChange = (oldVal: number, newVal: number): number => {
  return ((newVal - oldVal) / oldVal) * 100;
};
