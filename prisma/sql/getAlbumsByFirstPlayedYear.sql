select id,
  artist,
  comments,
  first_played_timestamp,
  first_played_date,
  title,
  year,
  type,
  inserted_at,
  updated_at
from albums
where coalesce(
    extract(
      year
      from first_played_timestamp
    ),
    first_played_date [1]
  ) = $1
order by coalesce(
    extract(
      year
      from first_played_timestamp
    ),
    first_played_date [1]
  ),
  coalesce(
    extract(
      month
      from first_played_timestamp
    ),
    first_played_date [2],
    1
  ),
  coalesce(
    extract(
      day
      from first_played_timestamp
    ),
    first_played_date [3],
    1
  )
