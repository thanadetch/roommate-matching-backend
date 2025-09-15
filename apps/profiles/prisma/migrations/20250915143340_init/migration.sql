-- CreateEnum
CREATE TYPE "profiles"."Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "profiles"."Profile" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "profiles"."Gender",
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "preferredArea" TEXT,
    "lifestyle" JSONB,
    "contactLine" TEXT,
    "contactEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "profiles"."Profile"("email");

-- CreateIndex
CREATE INDEX "Profile_preferredArea_idx" ON "profiles"."Profile"("preferredArea");

-- CreateIndex
CREATE INDEX "Profile_budgetMin_budgetMax_idx" ON "profiles"."Profile"("budgetMin", "budgetMax");
