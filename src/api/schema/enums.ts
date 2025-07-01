import { builder } from "./builder";

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

export const albumTypes = [
  "ALBUM",
  "SINGLE",
  "EP",
  "COMPILATION",
  "LIVE",
] as const;

export const GraphQLFormat = builder.enumType("Format", {
  values: formats,
});

export const GraphQLLocation = builder.enumType("Location", {
  values: locations,
});

export const GraphQLAlbumType = builder.enumType("AlbumType", {
  values: albumTypes,
});
