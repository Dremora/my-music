/*
  Warnings:

  - You are about to alter the column `format` on the `album_sources` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum("format")`.

*/
-- CreateEnum
CREATE TYPE "format" AS ENUM ('TAK', 'APE', 'MP3', 'FLAC', 'WMA', 'MIXED', 'MPC');

-- AlterTable
ALTER TABLE "album_sources" ALTER COLUMN "format" SET DATA TYPE "format" USING format::format;
