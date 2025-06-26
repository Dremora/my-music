/* eslint-disable relay/unused-fields */
import { AnimatePresence, motion } from "motion/react";
import { type ChangeEvent, type FormEvent, useCallback, useState } from "react";
import { graphql } from "relay-runtime";

import { Button } from "components/Button";
import { FirstPlayedField } from "components/FirstPlayedField";
import { FormField } from "components/FormField";
import { Input } from "components/Input";
import { Source, type SourceData } from "components/Source";
import { Text } from "components/Text";
import { useIsFirstRender } from "data/useIsFirstRender";
import {
  type FirstPlayed,
  formatInteger,
  parseInteger,
  parseOptionalString,
} from "utils";

import { buttonsStyle, formStyle } from "./styles.css";

export const albumFormFragment = graphql`
  fragment AlbumFormFragment on Album {
    id
    artist
    title
    comments
    year
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
  readonly id?: string;
  readonly artist: string;
  readonly title: string;
  readonly comments: string | null;
  readonly year: number | null;
  readonly firstPlayed: FirstPlayed | null;
  readonly sources: readonly SourceData[];
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

  const [album, setAlbum] = useState<AlbumData>(initialValues);

  const submitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onSubmit({
        title: album.title,
        artist: album.artist,
        comments: album.comments,
        year: album.year,
        sources: album.sources,
        firstPlayed: album.firstPlayed,
      });
    },
    [album, onSubmit],
  );

  const onSourceUpdate = useCallback(
    (index: number, source: SourceData) => {
      const sources = [...album.sources];
      sources[index] = source;
      setAlbum({ ...album, sources });
    },
    [album],
  );

  const onSourceRemove = useCallback(
    (index: number) => {
      const sources = [...album.sources];
      sources.splice(index, 1);
      setAlbum({ ...album, sources });
    },
    [album],
  );

  const onSourceAdd = useCallback(() => {
    setAlbum({
      ...album,
      sources: [
        ...album.sources,
        {
          location: "APPLE_MUSIC",
          accurateRip: null,
          comments: null,
          cueIssues: null,
          discs: null,
          download: null,
          edition: null,
          format: null,
          id: "",
          mbid: null,
          tagIssues: null,
        },
      ],
    });
  }, [album]);

  const onFirstPlayedChange = useCallback(
    (firstPlayed: FirstPlayed | null) => {
      setAlbum({ ...album, firstPlayed });
    },
    [album],
  );

  const onTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAlbum({ ...album, title: e.target.value });
    },
    [album],
  );

  const onArtistChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAlbum({ ...album, artist: e.target.value });
    },
    [album],
  );

  const onYearChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAlbum({ ...album, year: parseInteger(e.target.value) });
    },
    [album],
  );

  const onCommentsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAlbum({ ...album, comments: parseOptionalString(e.target.value) });
    },
    [album],
  );

  return (
    <form className={formStyle} onSubmit={submitForm}>
      <Text color="grey" size="large" weight="bold">
        {isNew ? "Create album" : "Edit album"}
      </Text>
      <FormField label="Artist">
        <Input
          disabled={isSubmitting}
          onChange={onArtistChange}
          value={album.artist}
        />
      </FormField>
      <FormField label="Title">
        <Input
          disabled={isSubmitting}
          onChange={onTitleChange}
          value={album.title}
        />
      </FormField>
      <FormField label="Year">
        <Input
          disabled={isSubmitting}
          onChange={onYearChange}
          value={formatInteger(album.year ?? null)}
        />
      </FormField>
      <FirstPlayedField
        disabled={isSubmitting}
        onChange={onFirstPlayedChange}
        value={album.firstPlayed}
      />
      <FormField label="Comments">
        <Input
          disabled={isSubmitting}
          multiline
          onChange={onCommentsChange}
          value={album.comments ?? ""}
        />
      </FormField>
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
  );
}
