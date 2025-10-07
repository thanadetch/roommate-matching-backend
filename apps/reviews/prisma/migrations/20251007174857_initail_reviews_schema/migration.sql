-- CreateTable
CREATE TABLE "reviews"."reviews" (
    "id" TEXT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "reviewerId" TEXT NOT NULL,
    "revieweeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reviews_reviewerId_idx" ON "reviews"."reviews"("reviewerId");

-- CreateIndex
CREATE INDEX "reviews_revieweeId_idx" ON "reviews"."reviews"("revieweeId");

-- CreateIndex
CREATE INDEX "reviews_createdAt_idx" ON "reviews"."reviews"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_reviewerId_revieweeId_key" ON "reviews"."reviews"("reviewerId", "revieweeId");
