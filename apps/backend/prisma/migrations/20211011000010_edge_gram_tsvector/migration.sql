CREATE OR REPLACE FUNCTION edge_gram_tsvector(text text) RETURNS tsvector AS
$BODY$
BEGIN
    RETURN (select array_to_tsvector((select array_agg(distinct substring(lexeme for len)) from unnest(to_tsvector('simple', text)), generate_series(1,length(lexeme)) len)));
END;
$BODY$
IMMUTABLE
language plpgsql;
