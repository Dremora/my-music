-- CreateTable
CREATE TABLE "albums" (
    "id" UUID NOT NULL,
    "artist" VARCHAR(255) NOT NULL,
    "comments" VARCHAR(255),
    "first_played_timestamp" TIMESTAMP(6),
    "first_played_date" INTEGER[],
    "title" VARCHAR(255) NOT NULL,
    "year" INTEGER,
    "inserted_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "album_sources" (
    "id" BIGSERIAL NOT NULL,
    "accurate_rip" VARCHAR(255),
    "comments" VARCHAR(255),
    "cue_issues" VARCHAR(255),
    "discs" INTEGER,
    "download" VARCHAR(1000),
    "edition" VARCHAR(255),
    "format" VARCHAR(255),
    "location" VARCHAR(255) NOT NULL,
    "mbid" UUID,
    "tag_issues" VARCHAR(255),
    "album_id" UUID NOT NULL,
    "inserted_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" BIGINT NOT NULL,
    "inserted_at" TIMESTAMP(6),

    PRIMARY KEY ("version")
);

-- CreateIndex
CREATE INDEX "album_sources_album_id_index" ON "album_sources"("album_id");

-- AddForeignKey
ALTER TABLE "album_sources" ADD FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
