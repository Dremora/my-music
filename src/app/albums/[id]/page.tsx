"use client";

import { use, useCallback } from "react";

import { AlbumForm, type AlbumFormProps } from "components/AlbumForm";
import { Text } from "components/Text";
import { useLogin } from "data/login";
import { useGetAlbumQuery, useUpdateAlbumMutation } from "generated/graphql";

export default function AlbumPage({
  params,
}: {
  readonly params: Promise<{ readonly id: string }>;
}) {
  const { id } = use(params);
  const { isLoggedIn } = useLogin();

  const idString = id;

  const { data, error, loading } = useGetAlbumQuery({
    variables: { id: idString },
    skip: idString === "",
  });

  const [submit, { error: submitError, loading: isSubmitting }] =
    useUpdateAlbumMutation();

  const handleSubmit = useCallback(
    async (values: Parameters<AlbumFormProps["onSubmit"]>[0]) => {
      return submit({
        variables: {
          id: idString,
          ...values,
        },
      });
    },
    [idString, submit],
  );

  if (!isLoggedIn) {
    return null;
  }

  if (loading) {
    return (
      <div>
        <Text color="grey">Loading...</Text>
      </div>
    );
  } else if (error || !data) {
    return <span>error</span>;
  }

  return (
    <AlbumForm
      initialValues={data.album}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitError={submitError}
    />
  );
}
