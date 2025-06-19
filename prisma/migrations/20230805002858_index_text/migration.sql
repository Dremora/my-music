CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION immutable_unaccent(text)
  RETURNS text
  LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT AS
$func$
SELECT public.unaccent($1::text);
$func$;

CREATE INDEX index_albums_full_text ON albums USING gin((
  edge_gram_tsvector(
    immutable_unaccent(title)) ||
    edge_gram_tsvector(immutable_unaccent(artist)) ||
    coalesce(edge_gram_tsvector(coalesce(year :: text)), array_to_tsvector('{}'))
  )
);
