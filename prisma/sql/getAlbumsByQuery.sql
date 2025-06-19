select id,
  artist,
  comments,
  first_played_timestamp,
  first_played_date,
  title,
  year,
  inserted_at,
  updated_at
from albums
where edge_gram_tsvector(immutable_unaccent(title)) || edge_gram_tsvector(immutable_unaccent(artist)) || coalesce(
    edge_gram_tsvector(coalesce(year::text)),
    array_to_tsvector('{}')
  ) @@ plainto_tsquery('simple', immutable_unaccent($1))
limit 50
