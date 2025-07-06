/* eslint-disable relay/unused-fields */
import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useCallback, useMemo, useState } from "react";
import { graphql } from "relay-runtime";

import { Button } from "components/button";
import { FirstPlayedField } from "components/first-played-field";
import {
  identity,
  MultilineTextInputFormField,
  SelectFormField,
  TextInputFormField,
} from "components/form-field";
import { Source, type SourceData } from "components/source";
import { Text } from "components/text";
import { useIsFirstRender } from "data/use-is-first-render";
import type { AlbumType } from "generated/albumFormFragment.graphql";
import { type FirstPlayed, formatInteger, parseInteger } from "utils";
import { FormContext } from "utils/form";
import {
  albumCommentsSchema,
  albumTypes,
  albumTypesSchema,
  artistSchema,
  titleSchema,
  yearSchema,
} from "utils/validation";

import { buttonsStyle, formStyle } from "./styles.css";

export const albumFormFragment = graphql`
  fragment albumFormFragment on Album {
    id
    artist
    title
    comments
    year
    type
    firstPlayed {
      ... on FirstPlayedTimestamp {
        timestamp
      }
      ... on FirstPlayedDate {
        year
        month
        day
      }
    }
    sources {
      id
      location
      accurateRip
      comments
      cueIssues
      discs
      download
      edition
      format
      location
      mbid
      tagIssues
    }
  }
`;

export type AlbumData = {
  readonly artist: string;
  readonly comments: string | null;
  readonly firstPlayed: FirstPlayed | null;
  readonly id?: string;
  readonly sources: readonly SourceData[];
  readonly title: string;
  readonly type: AlbumType | null;
  readonly year: number | null;
};

export type AlbumFormProps = {
  readonly initialValues: AlbumData;
  readonly isNew?: boolean;
  readonly isSubmitting: boolean;
  readonly onSubmit: (data: Readonly<AlbumData>) => void;
  readonly submitError: string | null;
};

export function AlbumForm({
  initialValues,
  isNew = false,
  isSubmitting,
  onSubmit,
  submitError,
}: AlbumFormProps) {
  const isFirstRender = useIsFirstRender();
  const [invalidFieldCount, setInvalidFieldCount] = useState(0);
  const [album, setAlbum] = useState<AlbumData>(initialValues);
  const [submitted, setSubmitted] = useState(false);

  const submitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setSubmitted(true);

      if (invalidFieldCount !== 0) {
        return;
      }

      onSubmit({
        title: album.title,
        artist: album.artist,
        comments: album.comments,
        year: album.year,
        type: album.type,
        sources: album.sources,
        firstPlayed: album.firstPlayed,
      });
    },
    [
      album.artist,
      album.comments,
      album.firstPlayed,
      album.sources,
      album.title,
      album.type,
      album.year,
      onSubmit,
      invalidFieldCount,
    ],
  );

  const onSourceUpdate = useCallback(
    (index: number, source: SourceData) => {
      const sources = [...album.sources];
      sources[index] = source;
      setAlbum((value) => ({ ...value, sources }));
    },
    [album],
  );

  const onSourceRemove = useCallback(
    (index: number) => {
      const sources = [...album.sources];
      sources.splice(index, 1);
      setAlbum((value) => ({ ...value, sources }));
    },
    [album],
  );

  const onSourceAdd = useCallback(() => {
    setAlbum((value) => ({
      ...value,
      sources: [
        ...value.sources,
        {
          location: "APPLE_MUSIC",
          accurateRip: null,
          comments: null,
          cueIssues: null,
          discs: null,
          download: null,
          edition: null,
          format: null,
          mbid: null,
          tagIssues: null,
        },
      ],
    }));
  }, []);

  const setFieldError = useCallback(() => {
    setInvalidFieldCount((value) => value + 1);
  }, []);

  const unsetFieldError = useCallback(() => {
    setInvalidFieldCount((value) => value - 1);
  }, []);

  return (
    <FormContext.Provider
      value={useMemo(
        () => ({ submitted, setFieldError, unsetFieldError, isSubmitting }),
        [submitted, setFieldError, unsetFieldError, isSubmitting],
      )}
    >
      <form className={formStyle} onSubmit={submitForm}>
        <Text color="grey" size="large" weight="bold">
          {isNew ? "Create album" : "Edit album"}
        </Text>
        <TextInputFormField
          format={identity}
          label="Artist"
          onChange={(artist) => {
            setAlbum((value) => ({ ...value, artist }));
          }}
          parse={identity}
          schema={artistSchema}
          value={album.artist}
        />

        <TextInputFormField
          format={identity}
          label="Title"
          onChange={(title) => {
            setAlbum((value) => ({ ...value, title }));
          }}
          parse={identity}
          schema={titleSchema}
          value={album.title}
        />

        <TextInputFormField
          format={formatInteger}
          inputmode="numeric"
          label="Year"
          onChange={(year) => {
            setAlbum((value) => ({ ...value, year }));
          }}
          parse={parseInteger}
          pattern="[0-9]*"
          schema={yearSchema}
          value={album.year}
        />

        <SelectFormField
          allowEmpty
          label="Type"
          onChange={(type) => {
            setAlbum((value) => ({ ...value, type }));
          }}
          options={albumTypes}
          schema={albumTypesSchema}
          value={album.type}
        />

        <FirstPlayedField
          disabled={isSubmitting}
          onChange={(firstPlayed) => {
            setAlbum((value) => ({ ...value, firstPlayed }));
          }}
          value={album.firstPlayed}
        />

        <MultilineTextInputFormField
          format={(value) => value ?? ""}
          label="Comments"
          onChange={(comments) => {
            setAlbum((value) => ({ ...value, comments }));
          }}
          parse={identity}
          schema={albumCommentsSchema}
          value={album.comments}
        />

        <AnimatePresence>
          {album.sources.map((source, index) => (
            <motion.div
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              initial={{ height: isFirstRender ? "auto" : 0 }}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={{ overflow: "hidden" }}
              transition={{ type: "tween" }}
            >
              <Source
                disabled={isSubmitting}
                index={index}
                onRemove={onSourceRemove}
                onUpdate={onSourceUpdate}
                source={source}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <div className={buttonsStyle}>
          <Button onClick={onSourceAdd} palette="link" size="small">
            Add source
          </Button>
          <Button disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </div>
        {submitError !== null ? (
          <Text color="vermilion">{submitError}</Text>
        ) : null}
      </form>
    </FormContext.Provider>
  );
}
