-- CreateEnum
CREATE TYPE "rooms"."ListingStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "rooms"."RoomListing" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "pricePerMonth" INTEGER NOT NULL,
    "availableFrom" TIMESTAMP(3),
    "status" "rooms"."ListingStatus" NOT NULL DEFAULT 'OPEN',
    "noSmoking" BOOLEAN NOT NULL DEFAULT false,
    "noPets" BOOLEAN NOT NULL DEFAULT false,
    "quiet" BOOLEAN NOT NULL DEFAULT false,
    "nightOwl" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomListing_pkey" PRIMARY KEY ("id")
);
