"use client";

import { use, useState } from "react";
import {
  graphql,
  useFragment,
  useLazyLoadQuery,
  useMutation,
} from "react-relay";

import type { albumFormFragment$key } from "@/generated/relay/albumFormFragment.graphql";
import type { pageGetAlbumQuery } from "@/generated/relay/pageGetAlbumQuery.graphql";
import type { pageUpdateAlbumMutation } from "@/generated/relay/pageUpdateAlbumMutation.graphql";
import {
  AlbumForm,
  albumFormFragment,
  type AlbumFormProps,
} from "components/album-form";

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

  const handleSubmit = (values: Parameters<AlbumFormProps["onSubmit"]>[0]) => {
    setSubmitError(null);

    const type = values.type;

    if (!type) {
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
  };

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
