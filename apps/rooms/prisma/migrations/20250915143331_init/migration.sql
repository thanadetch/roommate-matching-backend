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
    "rules" JSONB,
    "availableFrom" TIMESTAMP(3),
    "status" "rooms"."ListingStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomListing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RoomListing_hostId_idx" ON "rooms"."RoomListing"("hostId");

-- CreateIndex
CREATE INDEX "RoomListing_status_location_idx" ON "rooms"."RoomListing"("status", "location");

-- CreateIndex
CREATE INDEX "RoomListing_pricePerMonth_idx" ON "rooms"."RoomListing"("pricePerMonth");
