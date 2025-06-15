import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import AlbumForm, { Props as AlbumFormProps } from "components/AlbumForm";
import { useLogin } from "data/login";
import {
  CreateAlbumMutationVariables,
  useCreateAlbumMutation,
} from "generated/graphql";

const createEmptyAlbum = (): CreateAlbumMutationVariables => ({
  title: "",
  artist: "",
  firstPlayed: { timestamp: Math.floor(new Date().getTime() / 1000) },
  sources: [],
});

function NewAlbumPage() {
  const router = useRouter();
  const { isLoggedIn } = useLogin();

  const emptyAlbum = useMemo(() => {
    return createEmptyAlbum();
  }, []);

  const [submit, { data, error, loading }] = useCreateAlbumMutation({
    onCompleted: ({ createAlbum: { id } }) =>
      void router.replace("/albums/[id]", `/albums/${id}`),
  });

  const handleSubmit = useCallback(
    (values: Parameters<AlbumFormProps["onSubmit"]>[0]) => {
      return submit({
        variables: {
          ...values,
        },
      });
    },
    [submit],
  );

  if (!isLoggedIn) {
    return null;
  }

  return (
    <AlbumForm
      initialValues={data?.createAlbum ? data.createAlbum : emptyAlbum}
      isNew={!data}
      isSubmitting={loading}
      onSubmit={handleSubmit}
      submitError={error}
    />
  );
}

export default NewAlbumPage;
