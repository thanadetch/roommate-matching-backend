/*
  Warnings:

  - You are about to drop the column `lifestyle` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `password` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "profiles"."Profile_budgetMin_budgetMax_idx";

-- DropIndex
DROP INDEX "profiles"."Profile_preferredArea_idx";

-- AlterTable
ALTER TABLE "profiles"."Profile" DROP COLUMN "lifestyle",
DROP COLUMN "passwordHash",
ADD COLUMN     "nightOwl" BOOLEAN DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "petOwner" BOOLEAN DEFAULT false,
ADD COLUMN     "quietPerson" BOOLEAN DEFAULT false,
ADD COLUMN     "smoking" BOOLEAN DEFAULT false;
