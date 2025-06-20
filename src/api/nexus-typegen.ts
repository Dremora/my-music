/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { Context } from "./context";
import type { Album, Source } from "@prisma/client";
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin";
import type { core } from "nexus";
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.
     */
    uuid<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
    ): void; // "UUID";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.
     */
    uuid<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "UUID";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AlbumFilterInput: {
    // input type
    query?: string | null; // String
    year?: number | null; // Int
  };
  FirstPlayedInput: {
    // input type
    day?: number | null; // Int
    month?: number | null; // Int
    timestamp?: number | null; // Int
    year?: number | null; // Int
  };
  NewSourceInput: {
    // input type
    accurateRip?: string | null; // String
    comments?: string | null; // String
    cueIssues?: string | null; // String
    discs?: number | null; // Int
    download?: string | null; // String
    edition?: string | null; // String
    format?: NexusGenEnums["Format"] | null; // Format
    location: NexusGenEnums["Location"]; // Location!
    mbid?: NexusGenScalars["UUID"] | null; // UUID
    tagIssues?: string | null; // String
  };
  SourceInput: {
    // input type
    accurateRip?: string | null; // String
    comments?: string | null; // String
    cueIssues?: string | null; // String
    discs?: number | null; // Int
    download?: string | null; // String
    edition?: string | null; // String
    format?: NexusGenEnums["Format"] | null; // Format
    id?: string | null; // ID
    location: NexusGenEnums["Location"]; // Location!
    mbid?: NexusGenScalars["UUID"] | null; // UUID
    tagIssues?: string | null; // String
  };
}

export interface NexusGenEnums {
  Format: "APE" | "FLAC" | "MIXED" | "MP3" | "MPC" | "TAK" | "WMA";
  Location: "APPLE_MUSIC" | "FOOBAR2000" | "GOOGLE_MUSIC" | "SPOTIFY";
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  UUID: string;
}

export interface NexusGenObjects {
  Album: Album;
  AlbumPerYearCount: {
    // root type
    count: number; // Int!
    year: number; // Int!
  };
  FirstPlayedDate: {
    // root type
    day?: number | null; // Int
    month?: number | null; // Int
    year: number; // Int!
  };
  FirstPlayedTime: {
    // root type
    timestamp: number; // Int!
  };
  Mutation: {};
  Query: {};
  Source: Source;
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {
  FirstPlayed:
    | NexusGenRootTypes["FirstPlayedDate"]
    | NexusGenRootTypes["FirstPlayedTime"];
}

export type NexusGenRootTypes = NexusGenObjects & NexusGenUnions;

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums;

export interface NexusGenFieldTypes {
  Album: {
    // field return type
    artist: string; // String!
    comments: string | null; // String
    firstPlayed: NexusGenRootTypes["FirstPlayed"] | null; // FirstPlayed
    id: NexusGenScalars["UUID"]; // UUID!
    sources: NexusGenRootTypes["Source"][]; // [Source!]!
    title: string; // String!
    year: number | null; // Int
  };
  AlbumPerYearCount: {
    // field return type
    count: number; // Int!
    year: number; // Int!
  };
  FirstPlayedDate: {
    // field return type
    day: number | null; // Int
    month: number | null; // Int
    year: number; // Int!
  };
  FirstPlayedTime: {
    // field return type
    timestamp: number; // Int!
  };
  Mutation: {
    // field return type
    createAlbum: NexusGenRootTypes["Album"]; // Album!
    deleteAlbum: boolean; // Boolean!
    login: boolean; // Boolean!
    updateAlbum: NexusGenRootTypes["Album"]; // Album!
  };
  Query: {
    // field return type
    album: NexusGenRootTypes["Album"]; // Album!
    albumPerFirstPlayedYearCount: NexusGenRootTypes["AlbumPerYearCount"][]; // [AlbumPerYearCount!]!
    albumPerYearCount: NexusGenRootTypes["AlbumPerYearCount"][]; // [AlbumPerYearCount!]!
    albums: NexusGenRootTypes["Album"][]; // [Album!]!
  };
  Source: {
    // field return type
    accurateRip: string | null; // String
    comments: string | null; // String
    cueIssues: string | null; // String
    discs: number | null; // Int
    download: string | null; // String
    edition: string | null; // String
    format: NexusGenEnums["Format"] | null; // Format
    id: string; // ID!
    location: NexusGenEnums["Location"]; // Location!
    mbid: NexusGenScalars["UUID"] | null; // UUID
    tagIssues: string | null; // String
  };
}

export interface NexusGenFieldTypeNames {
  Album: {
    // field return type name
    artist: "String";
    comments: "String";
    firstPlayed: "FirstPlayed";
    id: "UUID";
    sources: "Source";
    title: "String";
    year: "Int";
  };
  AlbumPerYearCount: {
    // field return type name
    count: "Int";
    year: "Int";
  };
  FirstPlayedDate: {
    // field return type name
    day: "Int";
    month: "Int";
    year: "Int";
  };
  FirstPlayedTime: {
    // field return type name
    timestamp: "Int";
  };
  Mutation: {
    // field return type name
    createAlbum: "Album";
    deleteAlbum: "Boolean";
    login: "Boolean";
    updateAlbum: "Album";
  };
  Query: {
    // field return type name
    album: "Album";
    albumPerFirstPlayedYearCount: "AlbumPerYearCount";
    albumPerYearCount: "AlbumPerYearCount";
    albums: "Album";
  };
  Source: {
    // field return type name
    accurateRip: "String";
    comments: "String";
    cueIssues: "String";
    discs: "Int";
    download: "String";
    edition: "String";
    format: "Format";
    id: "ID";
    location: "Location";
    mbid: "UUID";
    tagIssues: "String";
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    createAlbum: {
      // args
      artist: string; // String!
      comments?: string | null; // String
      firstPlayed?: NexusGenInputs["FirstPlayedInput"] | null; // FirstPlayedInput
      sources: NexusGenInputs["NewSourceInput"][]; // [NewSourceInput!]!
      title: string; // String!
      year?: number | null; // Int
    };
    deleteAlbum: {
      // args
      id: NexusGenScalars["UUID"]; // UUID!
    };
    login: {
      // args
      password: string; // String!
    };
    updateAlbum: {
      // args
      artist: string; // String!
      comments?: string | null; // String
      firstPlayed?: NexusGenInputs["FirstPlayedInput"] | null; // FirstPlayedInput
      id: NexusGenScalars["UUID"]; // UUID!
      sources: NexusGenInputs["SourceInput"][]; // [SourceInput!]!
      title: string; // String!
      year?: number | null; // Int
    };
  };
  Query: {
    album: {
      // args
      id: NexusGenScalars["UUID"]; // UUID!
    };
    albums: {
      // args
      filter: NexusGenInputs["AlbumFilterInput"]; // AlbumFilterInput!
    };
  };
}

export interface NexusGenAbstractTypeMembers {
  FirstPlayed: "FirstPlayedDate" | "FirstPlayedTime";
}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "FirstPlayed";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes["inputNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["scalarNames"];
  allOutputTypes:
    | NexusGenTypes["objectNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["unionNames"]
    | NexusGenTypes["interfaceNames"]
    | NexusGenTypes["scalarNames"];
  allNamedTypes:
    | NexusGenTypes["allInputTypes"]
    | NexusGenTypes["allOutputTypes"];
  abstractTypes: NexusGenTypes["interfaceNames"] | NexusGenTypes["unionNames"];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>;
  }
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
