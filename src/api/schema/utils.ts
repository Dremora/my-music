import type { AlbumType } from "@prisma/client";
import type { $DbEnums } from "@prisma/client/sql";

export function mapAlbumType(type: $DbEnums.album_type): AlbumType {
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
