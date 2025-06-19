select coalesce(
    extract(
      year
      from first_played_timestamp
    ),
    first_played_date [1],
    2005
  ) as first_played_year,
  count(*)
from albums
group by first_played_year
