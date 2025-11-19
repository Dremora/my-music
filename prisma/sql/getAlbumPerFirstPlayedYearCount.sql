-- @param {Boolean} $1:appleMusicFilter? Filter by Apple Music
SELECT
  coalesce(
    extract(
      YEAR
      FROM first_played_timestamp
    ),
    first_played_date[1],
    2005
  ) AS first_played_year,
  count(*) AS count
FROM albums
WHERE
  $1::boolean IS NULL
  OR (
    $1 = TRUE AND EXISTS (
      SELECT 1
      FROM album_sources
      WHERE
        album_sources.album_id = albums.id
        AND album_sources.location = 'apple-music'
    )
  )
  OR (
    $1 = FALSE AND NOT EXISTS (
      SELECT 1
      FROM album_sources
      WHERE
        album_sources.album_id = albums.id
        AND album_sources.location = 'apple-music'
    )
  )
GROUP BY first_played_year
