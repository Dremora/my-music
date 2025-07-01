-- CreateEnum
CREATE TYPE "album_type" AS ENUM ('album', 'single', 'ep');

-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "type" "album_type";
