import { format } from "date-fns-tz";

type Date =
  | {
      year: number;
    }
  | {
      year: number;
      month: number;
    }
  | {
      year: number;
      month: number;
      day: number;
    };

interface Timestamp {
  timestamp: number;
}

type FirstPlayed = Date | Timestamp | null;

export function formatFirstPlayed(val: FirstPlayed): string {
  if (!val) {
    return "";
  } else if ("timestamp" in val) {
    return format(new Date(val.timestamp * 1000), "d MMM yyyy HH:mm", {
      timeZone: "UTC",
    });
  } else if ("day" in val) {
    return format(Date.UTC(val.year, val.month - 1, val.day), "d MMM yyyy", {
      timeZone: "UTC",
    });
  } else if ("month" in val) {
    return format(Date.UTC(val.year, val.month - 1), "MMM yyyy", {
      timeZone: "UTC",
    });
  } else if ("year" in val) {
    return format(Date.UTC(val.year, 1), "yyyy", { timeZone: "UTC" });
  } else {
    return "";
  }
}

export const formatInteger = (value: number | null) =>
  (value && value.toString()) || "";
export const parseInteger = (value: string) =>
  value ? parseInt(value, 10) || null : null;
export const parseOptionalString = (value: string): string | null =>
  value === "" ? null : value;
