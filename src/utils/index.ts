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

type Timestamp = {
  timestamp: number;
};

type FirstPlayed = Date | Timestamp | null;

export function formatFirstPlayed(value: FirstPlayed): string {
  if (!value) {
    return "";
  } else if ("timestamp" in value) {
    return format(new Date(value.timestamp * 1000), "d MMM yyyy HH:mm", {
      timeZone: "UTC",
    });
  } else if ("day" in value) {
    return format(
      Date.UTC(value.year, value.month - 1, value.day),
      "d MMM yyyy",
      {
        timeZone: "UTC",
      },
    );
  } else if ("month" in value) {
    return format(Date.UTC(value.year, value.month - 1), "MMM yyyy", {
      timeZone: "UTC",
    });
  } else if ("year" in value) {
    return format(Date.UTC(value.year, 1), "yyyy", { timeZone: "UTC" });
  } else {
    return "";
  }
}

export const formatInteger = (value: number | null) => value?.toString() ?? "";
export const parseInteger = (value: string) =>
  value ? Number.parseInt(value, 10) || null : null;
export const parseOptionalString = (value: string): string | null =>
  value === "" ? null : value;
