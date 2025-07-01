"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { graphql, useMutation } from "react-relay";

import {
  type AlbumData,
  AlbumForm,
  type AlbumFormProps,
} from "components/AlbumForm";
import type { pageCreateAlbumMutation } from "generated/pageCreateAlbumMutation.graphql";

const createEmptyAlbum = (): AlbumData => ({
  title: "",
  artist: "",
  type: null,
  firstPlayed: { timestamp: Math.floor(Date.now() / 1000) },
  comments: null,
  year: null,
  sources: [],
});

const pageCreateAlbumMutation = graphql`
  mutation pageCreateAlbumMutation($input: MutationCreateAlbumInput!) {
    createAlbum(input: $input) {
      id
      ...AlbumFormFragment
    }
  }
`;

export default function NewAlbumPage() {
  const router = useRouter();

  const initialData = useRef(createEmptyAlbum());

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const [commit, isPending] = useMutation<pageCreateAlbumMutation>(
    pageCreateAlbumMutation,
  );

  const handleSubmit = useCallback(
    (values: Parameters<AlbumFormProps["onSubmit"]>[0]) => {
      setSubmitError(null);

      const type = values.type;

      if (!type) {
        setSubmitError("Type is required");

        return;
      }

      commit({
        variables: {
          input: {
            ...values,
            type,
          },
        },
        onError: (error) => {
          setSubmitError(error.message);
        },
        onCompleted: ({ createAlbum }) => {
          setIsSaved(true);
          router.replace(`/albums/${createAlbum.id}`);
        },
      });
    },
    [commit, router],
  );

  return (
    <AlbumForm
      initialValues={initialData.current}
      isNew
      isSubmitting={isPending || isSaved}
      onSubmit={handleSubmit}
      submitError={submitError}
    />
  );
}
