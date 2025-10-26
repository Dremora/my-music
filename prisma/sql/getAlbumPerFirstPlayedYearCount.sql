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
GROUP BY first_played_year
