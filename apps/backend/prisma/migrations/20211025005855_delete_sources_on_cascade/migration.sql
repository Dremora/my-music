-- DropForeignKey
ALTER TABLE "album_sources" DROP CONSTRAINT "album_sources_album_id_fkey";

-- AddForeignKey
ALTER TABLE "album_sources" ADD CONSTRAINT "album_sources_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
