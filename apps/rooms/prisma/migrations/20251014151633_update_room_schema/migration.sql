/*
  Warnings:

  - You are about to drop the column `lifestyle` on the `RoomListing` table. All the data in the column will be lost.
  - You are about to drop the column `rules` on the `RoomListing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms"."RoomListing" DROP COLUMN "lifestyle",
DROP COLUMN "rules",
ADD COLUMN     "nightOwl" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "noPets" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "noSmoking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quiet" BOOLEAN NOT NULL DEFAULT false;
