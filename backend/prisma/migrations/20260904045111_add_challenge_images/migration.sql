-- CreateTable
CREATE TABLE "ChallengeImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publicId" TEXT,
    "challengeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChallengeImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChallengeImage_challengeId_idx" ON "ChallengeImage"("challengeId");

-- AddForeignKey
ALTER TABLE "ChallengeImage" ADD CONSTRAINT "ChallengeImage_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
