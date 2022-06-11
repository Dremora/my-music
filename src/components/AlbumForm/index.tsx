import { ApolloError } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import Button from "components/Button";
import FirstPlayedField from "components/FirstPlayedField";
import FormField from "components/FormField";
import Input from "components/Input";
import Source from "components/Source";
import Text from "components/Text";
import useIsFirstRender from "data/useIsFirstRender";
import {
  CreateAlbumMutationVariables,
  FirstPlayedInput,
  GetAlbumQuery,
  Location,
  NewSourceInput,
  UpdateAlbumMutationVariables,
} from "generated/graphql";
import { formatInteger, parseInteger, parseOptionalString } from "utils";

import { buttonsStyle, formStyle } from "./styles.css";

export interface Props {
  initialValues: CreateAlbumMutationVariables | GetAlbumQuery["album"];
  isNew?: boolean;
  isSubmitting: boolean;
  onSubmit:
    | ((data: CreateAlbumMutationVariables) => Promise<unknown>)
    | ((data: Omit<UpdateAlbumMutationVariables, "id">) => Promise<unknown>);
  submitError?: ApolloError | undefined;
}

type AlbumSource = NewSourceInput | GetAlbumQuery["album"]["sources"][number];

type FormData = Omit<CreateAlbumMutationVariables, "sources"> & {
  firstPlayed?:
    | (FirstPlayedInput & {
        __typename?: string;
      })
    | null
    | undefined;
  sources: readonly (NewSourceInput & {
    readonly __typename?: string;
  })[];
};

function AlbumForm({
  initialValues,
  isNew,
  isSubmitting,
  onSubmit,
  submitError,
}: Props) {
  const isFirstRender = useIsFirstRender();
  const [album, setAlbum] = useState<FormData>(initialValues);

  const submitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      void onSubmit({
        title: album.title,
        artist: album.artist,
        comments: album.comments,
        year: album.year,
        sources: album.sources.map((source) => {
          if ("__typename" in source) {
            const { __typename, ...rest } = source;
            return rest;
          } else {
            return source;
          }
        }),
        firstPlayed: (() => {
          if (album.firstPlayed) {
            if ("__typename" in album.firstPlayed) {
              const { __typename, ...rest } = album.firstPlayed;
              return rest;
            } else {
              return album.firstPlayed;
            }
          } else {
            return album.firstPlayed;
          }
        })(),
      });
    },
    [album, onSubmit]
  );

  const onSourceUpdate = useCallback(
    (index: number, source: AlbumSource) => {
      const sources = [...album.sources];
      sources[index] = source;
      setAlbum({ ...album, sources });
    },
    [album]
  );

  const onSourceRemove = useCallback(
    (index: number) => {
      const sources = [...album.sources];
      sources.splice(index, 1);
      setAlbum({ ...album, sources });
    },
    [album]
  );

  const onSourceAdd = useCallback(() => {
    setAlbum({
      ...album,
      sources: [...album.sources, { location: Location.APPLE_MUSIC }],
    });
  }, [album]);

  const onFirstPlayedChange = useCallback(
    (firstPlayed: FirstPlayedInput | null) => {
      setAlbum({ ...album, firstPlayed });
    },
    [album]
  );

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAlbum({ ...album, title: e.target.value });
    },
    [album]
  );

  const onArtistChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAlbum({ ...album, artist: e.target.value });
    },
    [album]
  );

  const onYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAlbum({ ...album, year: parseInteger(e.target.value) });
    },
    [album]
  );

  const onCommentsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAlbum({ ...album, comments: parseOptionalString(e.target.value) });
    },
    [album]
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
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore https://github.com/framer/motion/pull/1573 */}
      <AnimatePresence>
        {album.sources.map((source, i) => (
          <motion.div
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            initial={{ height: isFirstRender ? "auto" : 0 }}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{ overflow: "hidden" }}
            transition={{ type: "tween" }}
          >
            <Source
              disabled={isSubmitting}
              index={i}
              onRemove={onSourceRemove}
              onUpdate={onSourceUpdate}
              source={source}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <div className={buttonsStyle}>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Button onClick={onSourceAdd} palette="link" size="small">
          Add source
        </Button>
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </div>
      {submitError ? (
        <Text color="vermilion">{submitError.message}</Text>
      ) : null}
    </form>
  );
}

export default AlbumForm;
