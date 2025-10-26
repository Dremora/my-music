SELECT
  id,
  artist,
  comments,
  first_played_timestamp,
  first_played_date,
  title,
  year,
  type,
  inserted_at,
  updated_at
FROM albums
WHERE
  edge_gram_tsvector(
    immutable_unaccent(
      title || ' ' || artist || ' ' || coalesce(year::text, '')
    )
  )
  @@ plainto_tsquery('simple', immutable_unaccent($1))
ORDER BY
  artist,
  year,
  title
LIMIT 50
