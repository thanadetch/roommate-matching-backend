-- CreateEnum
CREATE TYPE "roommate_matching"."InterestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "roommate_matching"."MatchStatus" AS ENUM ('MATCHED', 'ENDED');

-- CreateTable
CREATE TABLE "roommate_matching"."Interest" (
    "id" TEXT NOT NULL,
    "roomListingId" TEXT NOT NULL,
    "seekerId" TEXT NOT NULL,
    "message" TEXT,
    "lifestyle" JSONB,
    "status" "roommate_matching"."InterestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roommate_matching"."RoommateMatch" (
    "id" TEXT NOT NULL,
    "roomListingId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "seekerId" TEXT NOT NULL,
    "matchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "roommate_matching"."MatchStatus" NOT NULL DEFAULT 'MATCHED',
    "review" TEXT,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoommateMatch_pkey" PRIMARY KEY ("id")
);
