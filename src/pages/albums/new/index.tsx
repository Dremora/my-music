import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import { AlbumForm, type Props as AlbumFormProps } from "components/AlbumForm";
import { useLogin } from "data/login";
import {
  type CreateAlbumMutationVariables,
  useCreateAlbumMutation,
} from "generated/graphql";

const createEmptyAlbum = (): CreateAlbumMutationVariables["input"] => ({
  title: "",
  artist: "",
  firstPlayed: { timestamp: Math.floor(Date.now() / 1000) },
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
    async (values: Parameters<AlbumFormProps["onSubmit"]>[0]) => {
      return submit({
        variables: {
          input: values,
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
      initialValues={data?.createAlbum ?? emptyAlbum}
      isNew={!data}
      isSubmitting={loading}
      onSubmit={handleSubmit}
      submitError={error}
    />
  );
}

export default NewAlbumPage;
