/* eslint-disable */
//
// NOTE:
// This file is generated, do not change this manually.
// To regenerate it, run `pnpm types:generate:graphql`
//
import type { DocumentNode } from "graphql";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: string;
};

export type Album = {
  readonly __typename: "Album";
  readonly artist: Scalars["String"];
  readonly comments: Maybe<Scalars["String"]>;
  readonly firstPlayed: Maybe<FirstPlayed>;
  readonly id: Scalars["UUID"];
  readonly sources: ReadonlyArray<Source>;
  readonly title: Scalars["String"];
  readonly type: Maybe<Type>;
  readonly year: Maybe<Scalars["Int"]>;
};

export type AlbumFilterInput = {
  readonly query?: InputMaybe<Scalars["String"]>;
  readonly year?: InputMaybe<Scalars["Int"]>;
};

export type AlbumPerYearCount = {
  readonly __typename: "AlbumPerYearCount";
  readonly count: Scalars["Int"];
  readonly year: Scalars["Int"];
};

export type FirstPlayed = FirstPlayedDate | FirstPlayedTime;

export type FirstPlayedDate = {
  readonly __typename: "FirstPlayedDate";
  readonly day: Maybe<Scalars["Int"]>;
  readonly month: Maybe<Scalars["Int"]>;
  readonly year: Scalars["Int"];
};

export type FirstPlayedInput = {
  readonly day?: InputMaybe<Scalars["Int"]>;
  readonly month?: InputMaybe<Scalars["Int"]>;
  readonly timestamp?: InputMaybe<Scalars["Int"]>;
  readonly year?: InputMaybe<Scalars["Int"]>;
};

export type FirstPlayedTime = {
  readonly __typename: "FirstPlayedTime";
  readonly timestamp: Scalars["Int"];
};

export const Format = {
  APE: "APE",
  FLAC: "FLAC",
  MIXED: "MIXED",
  MP3: "MP3",
  MPC: "MPC",
  TAK: "TAK",
  WMA: "WMA",
} as const;

export type Format = (typeof Format)[keyof typeof Format];
export const Location = {
  APPLE_MUSIC: "APPLE_MUSIC",
  FOOBAR2000: "FOOBAR2000",
  GOOGLE_MUSIC: "GOOGLE_MUSIC",
  SPOTIFY: "SPOTIFY",
} as const;

export type Location = (typeof Location)[keyof typeof Location];
export type Mutation = {
  readonly __typename: "Mutation";
  readonly createAlbum: Album;
  readonly deleteAlbum: Scalars["Boolean"];
  readonly login: Scalars["Boolean"];
  readonly updateAlbum: Album;
};

export type MutationCreateAlbumArgs = {
  artist: Scalars["String"];
  comments?: InputMaybe<Scalars["String"]>;
  firstPlayed?: InputMaybe<FirstPlayedInput>;
  sources: ReadonlyArray<NewSourceInput>;
  title: Scalars["String"];
  year?: InputMaybe<Scalars["Int"]>;
};

export type MutationDeleteAlbumArgs = {
  id: Scalars["UUID"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
};

export type MutationUpdateAlbumArgs = {
  artist: Scalars["String"];
  comments?: InputMaybe<Scalars["String"]>;
  firstPlayed?: InputMaybe<FirstPlayedInput>;
  id: Scalars["UUID"];
  sources: ReadonlyArray<SourceInput>;
  title: Scalars["String"];
  year?: InputMaybe<Scalars["Int"]>;
};

export type NewSourceInput = {
  readonly accurateRip?: InputMaybe<Scalars["String"]>;
  readonly comments?: InputMaybe<Scalars["String"]>;
  readonly cueIssues?: InputMaybe<Scalars["String"]>;
  readonly discs?: InputMaybe<Scalars["Int"]>;
  readonly download?: InputMaybe<Scalars["String"]>;
  readonly edition?: InputMaybe<Scalars["String"]>;
  readonly format?: InputMaybe<Format>;
  readonly location: Location;
  readonly mbid?: InputMaybe<Scalars["UUID"]>;
  readonly tagIssues?: InputMaybe<Scalars["String"]>;
};

export type Query = {
  readonly __typename: "Query";
  readonly album: Album;
  readonly albumPerFirstPlayedYearCount: ReadonlyArray<AlbumPerYearCount>;
  readonly albumPerYearCount: ReadonlyArray<AlbumPerYearCount>;
  readonly albums: ReadonlyArray<Album>;
};

export type QueryAlbumArgs = {
  id: Scalars["UUID"];
};

export type QueryAlbumsArgs = {
  filter: AlbumFilterInput;
};

export type Source = {
  readonly __typename: "Source";
  readonly accurateRip: Maybe<Scalars["String"]>;
  readonly comments: Maybe<Scalars["String"]>;
  readonly cueIssues: Maybe<Scalars["String"]>;
  readonly discs: Maybe<Scalars["Int"]>;
  readonly download: Maybe<Scalars["String"]>;
  readonly edition: Maybe<Scalars["String"]>;
  readonly format: Maybe<Format>;
  readonly id: Scalars["ID"];
  readonly location: Location;
  readonly mbid: Maybe<Scalars["UUID"]>;
  readonly tagIssues: Maybe<Scalars["String"]>;
};

export type SourceInput = {
  readonly accurateRip?: InputMaybe<Scalars["String"]>;
  readonly comments?: InputMaybe<Scalars["String"]>;
  readonly cueIssues?: InputMaybe<Scalars["String"]>;
  readonly discs?: InputMaybe<Scalars["Int"]>;
  readonly download?: InputMaybe<Scalars["String"]>;
  readonly edition?: InputMaybe<Scalars["String"]>;
  readonly format?: InputMaybe<Format>;
  readonly id?: InputMaybe<Scalars["ID"]>;
  readonly location: Location;
  readonly mbid?: InputMaybe<Scalars["UUID"]>;
  readonly tagIssues?: InputMaybe<Scalars["String"]>;
};

export const Type = {
  ALBUM: "ALBUM",
  EP: "EP",
  SINGLE: "SINGLE",
} as const;

export type Type = (typeof Type)[keyof typeof Type];
export type CreateAlbumMutationVariables = Exact<{
  title: Scalars["String"];
  artist: Scalars["String"];
  comments?: InputMaybe<Scalars["String"]>;
  year?: InputMaybe<Scalars["Int"]>;
  firstPlayed?: InputMaybe<FirstPlayedInput>;
  sources: ReadonlyArray<NewSourceInput>;
}>;

export type CreateAlbumMutation = {
  readonly __typename: "Mutation";
  readonly createAlbum: {
    readonly __typename: "Album";
    readonly id: string;
    readonly artist: string;
    readonly title: string;
    readonly comments: string | null;
    readonly year: number | null;
    readonly firstPlayed:
      | {
          readonly __typename: "FirstPlayedDate";
          readonly year: number;
          readonly month: number | null;
          readonly day: number | null;
        }
      | { readonly __typename: "FirstPlayedTime"; readonly timestamp: number }
      | null;
    readonly sources: ReadonlyArray<{
      readonly __typename: "Source";
      readonly id: string;
      readonly accurateRip: string | null;
      readonly comments: string | null;
      readonly cueIssues: string | null;
      readonly discs: number | null;
      readonly download: string | null;
      readonly edition: string | null;
      readonly format: Format | null;
      readonly location: Location;
      readonly mbid: string | null;
      readonly tagIssues: string | null;
    }>;
  };
};

export type LoginMutationVariables = Exact<{
  password: Scalars["String"];
}>;

export type LoginMutation = {
  readonly __typename: "Mutation";
  readonly login: boolean;
};

export type UpdateAlbumMutationVariables = Exact<{
  id: Scalars["UUID"];
  title: Scalars["String"];
  artist: Scalars["String"];
  comments?: InputMaybe<Scalars["String"]>;
  year?: InputMaybe<Scalars["Int"]>;
  firstPlayed?: InputMaybe<FirstPlayedInput>;
  sources: ReadonlyArray<SourceInput>;
}>;

export type UpdateAlbumMutation = {
  readonly __typename: "Mutation";
  readonly updateAlbum: {
    readonly __typename: "Album";
    readonly id: string;
    readonly artist: string;
    readonly title: string;
    readonly comments: string | null;
    readonly year: number | null;
    readonly firstPlayed:
      | {
          readonly __typename: "FirstPlayedDate";
          readonly year: number;
          readonly month: number | null;
          readonly day: number | null;
        }
      | { readonly __typename: "FirstPlayedTime"; readonly timestamp: number }
      | null;
    readonly sources: ReadonlyArray<{
      readonly __typename: "Source";
      readonly id: string;
      readonly accurateRip: string | null;
      readonly comments: string | null;
      readonly cueIssues: string | null;
      readonly discs: number | null;
      readonly download: string | null;
      readonly edition: string | null;
      readonly format: Format | null;
      readonly location: Location;
      readonly mbid: string | null;
      readonly tagIssues: string | null;
    }>;
  };
};

export type AlbumPerFirstPlayedYearCountQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AlbumPerFirstPlayedYearCountQuery = {
  readonly __typename: "Query";
  readonly albumPerFirstPlayedYearCount: ReadonlyArray<{
    readonly __typename: "AlbumPerYearCount";
    readonly year: number;
    readonly count: number;
  }>;
};

export type AlbumPerYearCountQueryVariables = Exact<{ [key: string]: never }>;

export type AlbumPerYearCountQuery = {
  readonly __typename: "Query";
  readonly albumPerYearCount: ReadonlyArray<{
    readonly __typename: "AlbumPerYearCount";
    readonly year: number;
    readonly count: number;
  }>;
};

export type FindAlbumsQueryVariables = Exact<{
  filter: AlbumFilterInput;
}>;

export type FindAlbumsQuery = {
  readonly __typename: "Query";
  readonly albums: ReadonlyArray<{
    readonly __typename: "Album";
    readonly id: string;
    readonly artist: string;
    readonly title: string;
    readonly year: number | null;
    readonly firstPlayed:
      | {
          readonly __typename: "FirstPlayedDate";
          readonly year: number;
          readonly month: number | null;
          readonly day: number | null;
        }
      | { readonly __typename: "FirstPlayedTime"; readonly timestamp: number }
      | null;
  }>;
};

export type GetAlbumQueryVariables = Exact<{
  id: Scalars["UUID"];
}>;

export type GetAlbumQuery = {
  readonly __typename: "Query";
  readonly album: {
    readonly __typename: "Album";
    readonly id: string;
    readonly artist: string;
    readonly title: string;
    readonly comments: string | null;
    readonly year: number | null;
    readonly firstPlayed:
      | {
          readonly __typename: "FirstPlayedDate";
          readonly year: number;
          readonly month: number | null;
          readonly day: number | null;
        }
      | { readonly __typename: "FirstPlayedTime"; readonly timestamp: number }
      | null;
    readonly sources: ReadonlyArray<{
      readonly __typename: "Source";
      readonly id: string;
      readonly accurateRip: string | null;
      readonly comments: string | null;
      readonly cueIssues: string | null;
      readonly discs: number | null;
      readonly download: string | null;
      readonly edition: string | null;
      readonly format: Format | null;
      readonly location: Location;
      readonly mbid: string | null;
      readonly tagIssues: string | null;
    }>;
  };
};

export const CreateAlbumDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateAlbum" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "artist" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "comments" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "year" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firstPlayed" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "FirstPlayedInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "sources" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "NewSourceInput" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAlbum" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "artist" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "artist" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "comments" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "comments" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "year" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "year" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstPlayed" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firstPlayed" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sources" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sources" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "artist" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "comments" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firstPlayed" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "FirstPlayedTime" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "timestamp" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "FirstPlayedDate" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "year" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "month" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "day" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sources" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "accurateRip" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "comments" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cueIssues" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "discs" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "download" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "edition" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "format" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "location" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "mbid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tagIssues" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type CreateAlbumMutationFn = Apollo.MutationFunction<
  CreateAlbumMutation,
  CreateAlbumMutationVariables
>;

/**
 * __useCreateAlbumMutation__
 *
 * To run a mutation, you first call `useCreateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumMutation, { data, loading, error }] = useCreateAlbumMutation({
 *   variables: {
 *      title: // value for 'title'
 *      artist: // value for 'artist'
 *      comments: // value for 'comments'
 *      year: // value for 'year'
 *      firstPlayed: // value for 'firstPlayed'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useCreateAlbumMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAlbumMutation,
    CreateAlbumMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(
    CreateAlbumDocument,
    options,
  );
}
export type CreateAlbumMutationHookResult = ReturnType<
  typeof useCreateAlbumMutation
>;
export type CreateAlbumMutationResult =
  Apollo.MutationResult<CreateAlbumMutation>;
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<
  CreateAlbumMutation,
  CreateAlbumMutationVariables
>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const UpdateAlbumDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateAlbum" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "artist" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "comments" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "year" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firstPlayed" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "FirstPlayedInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "sources" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "SourceInput" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateAlbum" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "artist" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "artist" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "comments" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "comments" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "year" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "year" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstPlayed" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firstPlayed" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sources" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sources" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "artist" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "comments" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firstPlayed" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "FirstPlayedTime" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "timestamp" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "FirstPlayedDate" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "year" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "month" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "day" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sources" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "accurateRip" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "comments" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cueIssues" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "discs" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "download" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "edition" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "format" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "location" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "mbid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tagIssues" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type UpdateAlbumMutationFn = Apollo.MutationFunction<
  UpdateAlbumMutation,
  UpdateAlbumMutationVariables
>;

/**
 * __useUpdateAlbumMutation__
 *
 * To run a mutation, you first call `useUpdateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAlbumMutation, { data, loading, error }] = useUpdateAlbumMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      artist: // value for 'artist'
 *      comments: // value for 'comments'
 *      year: // value for 'year'
 *      firstPlayed: // value for 'firstPlayed'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useUpdateAlbumMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAlbumMutation,
    UpdateAlbumMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAlbumMutation, UpdateAlbumMutationVariables>(
    UpdateAlbumDocument,
    options,
  );
}
export type UpdateAlbumMutationHookResult = ReturnType<
  typeof useUpdateAlbumMutation
>;
export type UpdateAlbumMutationResult =
  Apollo.MutationResult<UpdateAlbumMutation>;
export type UpdateAlbumMutationOptions = Apollo.BaseMutationOptions<
  UpdateAlbumMutation,
  UpdateAlbumMutationVariables
>;
export const AlbumPerFirstPlayedYearCountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AlbumPerFirstPlayedYearCount" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "albumPerFirstPlayedYearCount" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "year" } },
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useAlbumPerFirstPlayedYearCountQuery__
 *
 * To run a query within a React component, call `useAlbumPerFirstPlayedYearCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumPerFirstPlayedYearCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumPerFirstPlayedYearCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useAlbumPerFirstPlayedYearCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AlbumPerFirstPlayedYearCountQuery,
    AlbumPerFirstPlayedYearCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AlbumPerFirstPlayedYearCountQuery,
    AlbumPerFirstPlayedYearCountQueryVariables
  >(AlbumPerFirstPlayedYearCountDocument, options);
}
export function useAlbumPerFirstPlayedYearCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AlbumPerFirstPlayedYearCountQuery,
    AlbumPerFirstPlayedYearCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AlbumPerFirstPlayedYearCountQuery,
    AlbumPerFirstPlayedYearCountQueryVariables
  >(AlbumPerFirstPlayedYearCountDocument, options);
}
export type AlbumPerFirstPlayedYearCountQueryHookResult = ReturnType<
  typeof useAlbumPerFirstPlayedYearCountQuery
>;
export type AlbumPerFirstPlayedYearCountLazyQueryHookResult = ReturnType<
  typeof useAlbumPerFirstPlayedYearCountLazyQuery
>;
export type AlbumPerFirstPlayedYearCountQueryResult = Apollo.QueryResult<
  AlbumPerFirstPlayedYearCountQuery,
  AlbumPerFirstPlayedYearCountQueryVariables
>;
export const AlbumPerYearCountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AlbumPerYearCount" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "albumPerYearCount" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "year" } },
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useAlbumPerYearCountQuery__
 *
 * To run a query within a React component, call `useAlbumPerYearCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumPerYearCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumPerYearCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useAlbumPerYearCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AlbumPerYearCountQuery,
    AlbumPerYearCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AlbumPerYearCountQuery,
    AlbumPerYearCountQueryVariables
  >(AlbumPerYearCountDocument, options);
}
export function useAlbumPerYearCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AlbumPerYearCountQuery,
    AlbumPerYearCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AlbumPerYearCountQuery,
    AlbumPerYearCountQueryVariables
  >(AlbumPerYearCountDocument, options);
}
export type AlbumPerYearCountQueryHookResult = ReturnType<
  typeof useAlbumPerYearCountQuery
>;
export type AlbumPerYearCountLazyQueryHookResult = ReturnType<
  typeof useAlbumPerYearCountLazyQuery
>;
export type AlbumPerYearCountQueryResult = Apollo.QueryResult<
  AlbumPerYearCountQuery,
  AlbumPerYearCountQueryVariables
>;
export const FindAlbumsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindAlbums" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AlbumFilterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "albums" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "artist" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firstPlayed" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "FirstPlayedTime" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "timestamp" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "FirstPlayedDate" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "year" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "month" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "day" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useFindAlbumsQuery__
 *
 * To run a query within a React component, call `useFindAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAlbumsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFindAlbumsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindAlbumsQuery,
    FindAlbumsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAlbumsQuery, FindAlbumsQueryVariables>(
    FindAlbumsDocument,
    options,
  );
}
export function useFindAlbumsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAlbumsQuery,
    FindAlbumsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindAlbumsQuery, FindAlbumsQueryVariables>(
    FindAlbumsDocument,
    options,
  );
}
export type FindAlbumsQueryHookResult = ReturnType<typeof useFindAlbumsQuery>;
export type FindAlbumsLazyQueryHookResult = ReturnType<
  typeof useFindAlbumsLazyQuery
>;
export type FindAlbumsQueryResult = Apollo.QueryResult<
  FindAlbumsQuery,
  FindAlbumsQueryVariables
>;
export const GetAlbumDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAlbum" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "album" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "artist" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "comments" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firstPlayed" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "FirstPlayedTime" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "timestamp" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "FirstPlayedDate" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "year" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "month" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "day" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sources" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "accurateRip" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "comments" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cueIssues" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "discs" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "download" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "edition" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "format" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "location" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "mbid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tagIssues" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useGetAlbumQuery__
 *
 * To run a query within a React component, call `useGetAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumQuery(
  baseOptions: Apollo.QueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAlbumQuery, GetAlbumQueryVariables>(
    GetAlbumDocument,
    options,
  );
}
export function useGetAlbumLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAlbumQuery,
    GetAlbumQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAlbumQuery, GetAlbumQueryVariables>(
    GetAlbumDocument,
    options,
  );
}
export type GetAlbumQueryHookResult = ReturnType<typeof useGetAlbumQuery>;
export type GetAlbumLazyQueryHookResult = ReturnType<
  typeof useGetAlbumLazyQuery
>;
export type GetAlbumQueryResult = Apollo.QueryResult<
  GetAlbumQuery,
  GetAlbumQueryVariables
>;
