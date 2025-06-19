import { enumType } from "nexus";

// TODO sync with Prisma
export const formats = [
  "APE",
  "FLAC",
  "MIXED",
  "MP3",
  "MPC",
  "TAK",
  "WMA",
] as const;

export const locations = [
  "APPLE_MUSIC",
  "FOOBAR2000",
  "GOOGLE_MUSIC",
  "SPOTIFY",
] as const;

export const format = enumType({
  name: "Format",
  members: formats,
});

export const location = enumType({
  name: "Location",
  members: locations,
});
