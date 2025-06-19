/*
  Warnings:

  - You are about to alter the column `location` on the `album_sources` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum("location")`.

*/
-- CreateEnum
CREATE TYPE "location" AS ENUM ('apple-music', 'foobar2000', 'google-music', 'spotify');

-- AlterTable
ALTER TABLE "album_sources" ALTER COLUMN "location" SET DATA TYPE "location" USING location::location;
