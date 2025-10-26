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
