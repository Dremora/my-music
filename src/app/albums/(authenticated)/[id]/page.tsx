"use client";

import { use, useCallback, useState } from "react";
import {
  graphql,
  useFragment,
  useLazyLoadQuery,
  useMutation,
} from "react-relay";

import {
  AlbumForm,
  albumFormFragment,
  type AlbumFormProps,
} from "components/album-form";
import type { albumFormFragment$key } from "generated/albumFormFragment.graphql";
import type { pageGetAlbumQuery } from "generated/pageGetAlbumQuery.graphql";
import type { pageUpdateAlbumMutation } from "generated/pageUpdateAlbumMutation.graphql";

const updateAlbumMutation = graphql`
  mutation pageUpdateAlbumMutation($input: MutationUpdateAlbumInput!) {
    updateAlbum(input: $input) {
      ...albumFormFragment
    }
  }
`;

const getAlbumQuery = graphql`
  query pageGetAlbumQuery($id: UUID!) {
    album(id: $id) {
      ...albumFormFragment
    }
  }
`;

export default function AlbumPage({
  params,
}: {
  readonly params: Promise<{ readonly id: string }>;
}) {
  const { id } = use(params);

  const data = useLazyLoadQuery<pageGetAlbumQuery>(getAlbumQuery, { id });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const [commit, isPending] =
    useMutation<pageUpdateAlbumMutation>(updateAlbumMutation);

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
            id,
            ...values,
            type,
          },
        },
        onError: (error) => {
          setSubmitError(error.message);
        },
      });
    },
    [commit, id],
  );

  const key: albumFormFragment$key = data.album;
  const fragment = useFragment(albumFormFragment, key);

  return (
    <AlbumForm
      initialValues={fragment}
      isSubmitting={isPending}
      onSubmit={handleSubmit}
      submitError={submitError}
    />
  );
}
