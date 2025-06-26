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
} from "components/AlbumForm";
import type { AlbumFormFragment$key } from "generated/AlbumFormFragment.graphql";
import type { pageGetAlbumQuery } from "generated/pageGetAlbumQuery.graphql";
import type { pageUpdateAlbumMutation } from "generated/pageUpdateAlbumMutation.graphql";

const updateAlbumMutation = graphql`
  mutation pageUpdateAlbumMutation($input: MutationUpdateAlbumInput!) {
    updateAlbum(input: $input) {
      ...AlbumFormFragment
    }
  }
`;

const getAlbumQuery = graphql`
  query pageGetAlbumQuery($id: UUID!) {
    album(id: $id) {
      ...AlbumFormFragment
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

      commit({
        variables: {
          input: {
            id,
            ...values,
          },
        },
        onError: (error) => {
          setSubmitError(error.message);
        },
      });
    },
    [commit, id],
  );

  const key: AlbumFormFragment$key = data.album;
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
