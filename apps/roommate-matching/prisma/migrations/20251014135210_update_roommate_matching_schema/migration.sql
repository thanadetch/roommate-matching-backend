/*
  Warnings:

  - You are about to drop the column `lifestyle` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `roomListingId` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the `RoommateMatch` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hostId` to the `Interest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roommate_matching"."Interest" DROP COLUMN "lifestyle",
DROP COLUMN "roomListingId",
ADD COLUMN     "hostId" TEXT NOT NULL,
ADD COLUMN     "roomId" TEXT NOT NULL;

-- DropTable
DROP TABLE "roommate_matching"."RoommateMatch";

-- DropEnum
DROP TYPE "roommate_matching"."MatchStatus";
