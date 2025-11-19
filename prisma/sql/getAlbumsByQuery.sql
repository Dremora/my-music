-- @param {String} $1:query The query to search for
-- @param {Boolean} $2:appleMusicFilter? Filter by Apple Music
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
  AND (
    $2::boolean IS NULL
    OR (
      $2 = TRUE AND EXISTS (
        SELECT 1
        FROM album_sources
        WHERE
          album_sources.album_id = albums.id
          AND album_sources.location = 'apple-music'
      )
    )
    OR (
      $2 = FALSE AND NOT EXISTS (
        SELECT 1
        FROM album_sources
        WHERE
          album_sources.album_id = albums.id
          AND album_sources.location = 'apple-music'
      )
    )
  )
ORDER BY
  artist,
  year,
  title
LIMIT 50
