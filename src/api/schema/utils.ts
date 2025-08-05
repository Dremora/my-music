import type { AlbumType } from "@/generated/prisma/enums";
import type { $DbEnums } from "@/generated/prisma/sql";

export function mapAlbumType(type: $DbEnums["album_type"]): AlbumType {
  switch (type) {
    case "album": {
      return "ALBUM";
    }

    case "compilation": {
      return "COMPILATION";
    }

    case "ep": {
      return "EP";
    }

    case "live": {
      return "LIVE";
    }

    case "single": {
      return "SINGLE";
    }

    case "soundtrack": {
      return "SOUNDTRACK";
    }
  }
}
