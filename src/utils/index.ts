import { format } from "date-fns-tz";

export type FirstPlayed = Date | Timestamp | null;

type Date = {
  day?: number | null;
  month?: number | null;
  year?: number | null;
};

type Timestamp = {
  timestamp?: number | null;
};

export function formatFirstPlayed(value: FirstPlayed): string {
  if (!value) {
    return "";
  } else if ("timestamp" in value && value.timestamp != null) {
    return format(new Date(value.timestamp * 1000), "d MMM yyyy HH:mm", {
      timeZone: "UTC",
    });
  } else if (
    "day" in value &&
    "month" in value &&
    "year" in value &&
    value.day != null &&
    value.month != null &&
    value.year != null
  ) {
    return format(
      Date.UTC(value.year, value.month - 1, value.day),
      "d MMM yyyy",
      {
        timeZone: "UTC",
      },
    );
  } else if ("month" in value && value.month != null && value.year != null) {
    return format(Date.UTC(value.year, value.month - 1), "MMM yyyy", {
      timeZone: "UTC",
    });
  } else if ("year" in value && value.year != null) {
    return format(Date.UTC(value.year, 1), "yyyy", { timeZone: "UTC" });
  } else {
    return "";
  }
}

export function formatInteger(value: number | null) {
  return value?.toString() ?? "";
}

export function parseInteger(value: string) {
  return value ? Number.parseInt(value, 10) || null : null;
}
