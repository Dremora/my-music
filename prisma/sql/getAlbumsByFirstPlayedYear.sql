-- @param {Int} $1:year The year to filter by
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
  coalesce(
    extract(
      YEAR
      FROM first_played_timestamp
    ),
    first_played_date[1]
  ) = $1
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
ORDER BY coalesce(
  extract(
    YEAR
    FROM first_played_timestamp
  ),
  first_played_date[1]
),
coalesce(
  extract(
    MONTH
    FROM first_played_timestamp
  ),
  first_played_date[2],
  1
),
coalesce(
  extract(
    DAY
    FROM first_played_timestamp
  ),
  first_played_date[3],
  1
)
